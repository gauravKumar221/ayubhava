'use client';

import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { DoctorScheduleSlot } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DoctorScheduleCalendarProps {
  schedule: DoctorScheduleSlot[];
}

export function DoctorScheduleCalendar({ schedule }: DoctorScheduleCalendarProps) {
  const today = new Date();
  const defaultSelected: DateRange = {
    from: today,
    to: addDays(today, 0),
  };
  const [date, setDate] = useState<DateRange | undefined>(defaultSelected);
  const selectedDay = date?.from ? format(date.from, 'yyyy-MM-dd') : format(today, 'yyyy-MM-dd');

  // For this demo, we assume all appointments in schedule are for "today".
  // A real app would filter appointments based on the selected date.
  const appointmentsForSelectedDay = schedule;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <Calendar
          mode="range"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Appointments for</CardTitle>
          <CardDescription>{selectedDay}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {appointmentsForSelectedDay.length > 0 ? (
            appointmentsForSelectedDay.map((slot) => (
              <div
                key={slot.time}
                className="flex items-center gap-3 rounded-lg border bg-card p-3"
              >
                <Clock className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="font-semibold">{slot.time}</p>
                  <p className="text-sm text-muted-foreground">{slot.patient}</p>
                </div>
                <Badge
                  variant={slot.status === 'Booked' ? 'secondary' : 'outline'}
                  className={cn({
                    'border-accent text-accent': slot.status === 'Available',
                  })}
                >
                  {slot.status}
                </Badge>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-muted-foreground">
              No appointments for this day.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
