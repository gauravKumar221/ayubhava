import type { Patient, Appointment, Doctor } from './types';

export const patients: Patient[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    lastVisit: '2024-07-10',
    status: 'Active',
    totalSpent: '2500.75',
    avatarId: 'user-avatar-1',
  },
  {
    id: '2',
    name: 'Michael Smith',
    email: 'michael.s@example.com',
    lastVisit: '2024-06-22',
    status: 'Active',
    totalSpent: '1500.00',
    avatarId: 'user-avatar-2',
  },
  {
    id: '3',
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    lastVisit: '2023-11-05',
    status: 'Inactive',
    totalSpent: '350.50',
    avatarId: 'user-avatar-3',
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david.w@example.com',
    lastVisit: '2024-07-01',
    status: 'Active',
    totalSpent: '5800.00',
    avatarId: 'user-avatar-4',
  },
  {
    id: '5',
    name: 'Jessica Brown',
    email: 'jessica.b@example.com',
    lastVisit: '2024-05-15',
    status: 'Active',
    totalSpent: '850.25',
    avatarId: 'user-avatar-5',
  },
];

export const appointments: Appointment[] = [
  {
    id: '1',
    patientName: 'Liam Johnson',
    doctorName: 'Dr. Carter',
    time: '09:00 AM',
    type: 'Check-up',
    avatarId: 'user-avatar-1',
  },
  {
    id: '2',
    patientName: 'Olivia Smith',
    doctorName: 'Dr. Adams',
    time: '09:30 AM',
    type: 'Consultation',
    avatarId: 'user-avatar-2',
  },
  {
    id: '3',
    patientName: 'Noah Williams',
    doctorName: 'Dr. Carter',
    time: '10:00 AM',
    type: 'Follow-up',
    avatarId: 'user-avatar-3',
  },
  {
    id: '4',
    patientName: 'Emma Brown',
    doctorName: 'Dr. Chen',
    time: '10:30 AM',
    type: 'Check-up',
    avatarId: 'user-avatar-4',
  },
  {
    id: '5',
    patientName: 'Ava Jones',
    doctorName: 'Dr. Rodriguez',
    time: '11:00 AM',
    type: 'Dental',
    avatarId: 'user-avatar-5',
  },
];

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Emily Carter',
    specialty: 'Cardiologist',
    avatarId: 'doctor-1',
    schedule: [
      { time: '09:00 AM', patient: 'Liam Johnson', status: 'Booked' },
      { time: '10:00 AM', patient: 'Noah Williams', status: 'Booked' },
      { time: '11:00 AM', patient: '', status: 'Available' },
      { time: '02:00 PM', patient: 'Sophia Martinez', status: 'Booked' },
    ],
  },
  {
    id: '2',
    name: 'Dr. Ben Adams',
    specialty: 'Pediatrician',
    avatarId: 'doctor-2',
    schedule: [
      { time: '09:30 AM', patient: 'Olivia Smith', status: 'Booked' },
      { time: '10:30 AM', patient: '', status: 'Available' },
      { time: '11:30 AM', patient: '', status: 'Available' },
      { time: '01:30 PM', patient: 'James Taylor', status: 'Booked' },
    ],
  },
  {
    id: '3',
    name: 'Dr. Olivia Chen',
    specialty: 'Dermatologist',
    avatarId: 'doctor-3',
    schedule: [
      { time: '10:30 AM', patient: 'Emma Brown', status: 'Booked' },
      { time: '11:00 AM', patient: 'Isabella Anderson', status: 'Booked' },
    ],
  },
  {
    id: '4',
    name: 'Dr. Marcus Rodriguez',
    specialty: 'Dentist',
    avatarId: 'doctor-4',
    schedule: [{ time: '11:00 AM', patient: 'Ava Jones', status: 'Booked' }],
  },
];
