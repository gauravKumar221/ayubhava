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
import type { DoctorScheduleSlot, AppointmentHistory } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DoctorScheduleCalendarProps {
  schedule: DoctorScheduleSlot[];
  appointmentHistory: AppointmentHistory[];
}

export function DoctorScheduleCalendar({
  schedule,
  appointmentHistory,
}: DoctorScheduleCalendarProps) {
  const today = new Date();
  const defaultSelected: DateRange = {
    from: today,
    to: addDays(today, 0),
  };
  const [date, setDate] = useState<DateRange | undefined>(defaultSelected);
  const selectedDay = date?.from
    ? format(date.from, 'yyyy-MM-dd')
    : format(today, 'yyyy-MM-dd');

  // For this demo, we assume all appointments in schedule are for "today".
  // A real app would filter appointments based on the selected date.
  const appointmentsForSelectedDay = schedule;

  return (
    <Tabs defaultValue="schedule">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="schedule">Full Day Schedule</TabsTrigger>
        <TabsTrigger value="history">Appointment History</TabsTrigger>
      </TabsList>
      <TabsContent value="schedule">
        <div className="mt-4 grid gap-6 md:grid-cols-2">
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
                      <p className="text-sm text-muted-foreground">
                        {slot.patient}
                      </p>
                    </div>
                    <Badge
                      variant={
                        slot.status === 'Booked' ? 'secondary' : 'outline'
                      }
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
      </TabsContent>
      <TabsContent value="history">
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Appointment History</CardTitle>
            <CardDescription>
              A record of past appointments for this doctor.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointmentHistory.length > 0 ? (
                  appointmentHistory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.patientName}
                      </TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.service}</TableCell>
                      <TableCell>{item.amount}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="h-24 text-center"
                    >
                      No appointment history.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
