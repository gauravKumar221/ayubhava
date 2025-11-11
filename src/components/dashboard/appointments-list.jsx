import { getPlaceholderImage } from '@/lib/placeholder-images.js';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.jsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.jsx';
import { appointments } from '@/lib/data.js';

export function AppointmentsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
        <CardDescription>
          You have {appointments.length} appointments today.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {appointments.slice(0, 5).map((appointment) => {
          const avatar = getPlaceholderImage(appointment.avatarId);
          return (
            <div key={appointment.id} className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                {avatar && (
                  <AvatarImage
                    src={avatar.imageUrl}
                    alt={appointment.patientName}
                    data-ai-hint={avatar.imageHint}
                  />
                )}
                <AvatarFallback>
                  {appointment.patientName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">{appointment.patientName}</p>
                <p className="text-sm text-muted-foreground">
                  {appointment.doctorName}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{appointment.time}</p>
                <p className="text-xs text-muted-foreground">
                  {appointment.type}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
