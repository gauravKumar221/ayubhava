export type Patient = {
  id: string;
  name: string;
  email: string;
  lastVisit: string;
  status: 'Active' | 'Inactive';
  totalSpent: string;
  avatarId: string;
};

export type Appointment = {
  id: string;
  patientName: string;
  doctorName: string;
  time: string;
  type: string;
  avatarId: string;
};

export type DoctorScheduleSlot = {
  time: string;
  patient: string;
  status: 'Booked' | 'Available';
};

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  avatarId: string;
  schedule: DoctorScheduleSlot[];
};

export type PageProps = {
  params: Record<string, string>;
  searchParams: Record<string, string | string[] | undefined>;
};
