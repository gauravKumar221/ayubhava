'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header.jsx';
import { doctors } from '@/lib/data.js';
import { getPlaceholderImage } from '@/lib/placeholder-images.js';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.jsx';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils.js';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.jsx';
import { DoctorScheduleCalendar } from '@/components/schedule/doctor-schedule-calendar.jsx';

export default function SchedulePage() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Doctor Schedule"
        description="Manage doctor availability and appointments."
      />
      <Dialog>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {doctors.map((doctor) => {
            const avatar = getPlaceholderImage(doctor.avatarId);
            return (
              <DialogTrigger
                asChild
                key={doctor.id}
                onClick={() => setSelectedDoctor(doctor)}
              >
                <Card className="cursor-pointer transition-all hover:shadow-md">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="h-16 w-16">
                      {avatar && (
                        <AvatarImage
                          src={avatar.imageUrl}
                          alt={doctor.name}
                          data-ai-hint={avatar.imageHint}
                          width={64}
                          height={64}
                        />
                      )}
                      <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{doctor.name}</CardTitle>
                      <CardDescription>{doctor.specialty}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="mb-2 font-medium text-muted-foreground">
                      Today's Schedule
                    </h3>
                    <div className="space-y-3">
                      {doctor.schedule.length > 0 ? (
                        doctor.schedule.map((slot) => (
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
                                slot.status === 'Booked'
                                  ? 'secondary'
                                  : 'outline'
                              }
                              className={cn({
                                'border-accent text-accent':
                                  slot.status === 'Available',
                              })}
                            >
                              {slot.status}
                            </Badge>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-sm text-muted-foreground">
                          No appointments scheduled for today.
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
            );
          })}
        </div>
        {selectedDoctor && (
          <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle>Schedule for {selectedDoctor.name}</DialogTitle>
            </DialogHeader>
            <DoctorScheduleCalendar
              schedule={selectedDoctor.schedule}
              appointmentHistory={selectedDoctor.appointmentHistory}
            />
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}