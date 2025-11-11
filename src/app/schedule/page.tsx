import Image from 'next/image';
import { PageHeader } from '@/components/shared/page-header';
import { doctors } from '@/lib/data';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock } from 'lucide-react';

export default function SchedulePage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Doctor Schedule"
        description="Manage doctor availability and appointments."
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {doctors.map((doctor) => {
          const avatar = getPlaceholderImage(doctor.avatarId);
          return (
            <Card key={doctor.id}>
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
                            slot.status === 'Booked' ? 'default' : 'outline'
                          }
                          className={
                            slot.status === 'Booked'
                              ? 'bg-soft-blue text-primary-foreground'
                              : 'border-green-500 text-green-500'
                          }
                          style={{
                            backgroundColor:
                              slot.status === 'Booked'
                                ? 'hsl(var(--soft-blue))'
                                : 'transparent',
                            color:
                              slot.status === 'Booked'
                                ? 'hsl(var(--foreground))'
                                : 'hsl(var(--accent))',
                             borderColor: 
                               slot.status === 'Available'
                                ? 'hsl(var(--accent))'
                                : 'transparent',
                          }}
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
          );
        })}
      </div>
    </div>
  );
}
