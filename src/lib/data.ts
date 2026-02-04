export const patients = [
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

export const appointments = [
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

export const orders = [
  {
    id: 'ORD-7721',
    customer: 'Sarah Johnson',
    date: '2024-07-28T14:30:00Z',
    total: 245.50,
    status: 'Processing',
    items: 3
  },
  {
    id: 'ORD-7722',
    customer: 'Michael Smith',
    date: '2024-07-28T15:45:00Z',
    total: 120.00,
    status: 'Completed',
    items: 1
  },
  {
    id: 'ORD-7723',
    customer: 'Emily Davis',
    date: '2024-07-27T10:15:00Z',
    total: 850.75,
    status: 'Pending',
    items: 5
  },
  {
    id: 'ORD-7724',
    customer: 'David Wilson',
    date: '2024-07-26T09:00:00Z',
    total: 45.00,
    status: 'Cancelled',
    items: 2
  }
];

export const users = [
  { id: 'u1', name: 'Admin User', email: 'admin@bitmax.com', role: 'Admin', status: 'Active', joinedDate: '2023-01-01', avatarId: 'user-avatar-1', loginMethod: 'Email', accountId: 'ACC-001', lastLogin: '2024-07-28 10:00 AM' },
  { id: 'u2', name: 'Dr. Emily Carter', email: 'e.carter@bitmax.com', role: 'Doctor', status: 'Active', joinedDate: '2023-05-15', avatarId: 'doctor-1', loginMethod: 'Email', accountId: 'ACC-002', lastLogin: '2024-07-28 09:30 AM' },
  { id: 'u3', name: 'John Doe', email: 'john.doe@example.com', role: 'Patient', status: 'Active', joinedDate: '2024-01-15', avatarId: 'user-avatar-2', loginMethod: 'Phone', accountId: 'ACC-003', lastLogin: '2024-07-27 02:15 PM' },
  { id: 'u4', name: 'Sarah Wilson', email: 's.wilson@bitmax.com', role: 'Staff', status: 'Pending', joinedDate: '2024-07-20', avatarId: 'user-avatar-3', loginMethod: 'Email', accountId: 'ACC-004', lastLogin: 'N/A' },
  { id: 'u5', name: 'Michael Smith', email: 'm.smith@example.com', role: 'Patient', status: 'Inactive', joinedDate: '2023-11-10', avatarId: 'user-avatar-4', loginMethod: 'Email', accountId: 'ACC-005', lastLogin: '2024-06-12 11:45 AM' },
];

const appointmentHistory = [
  {
    id: 'hist-1',
    patientName: 'Liam Johnson',
    date: '2024-06-15',
    service: 'Annual Check-up',
    amount: '$150.00',
  },
  {
    id: 'hist-2',
    patientName: 'Noah Williams',
    date: '2024-06-10',
    service: 'Consultation',
    amount: '$75.00',
  },
  {
    id: 'hist-3',
    patientName: 'Sophia Martinez',
    date: '2024-05-28',
    service: 'Echocardiogram',
    amount: '$450.00',
  },
  {
    id: 'hist-4',
    patientName: 'Olivia Smith',
    date: '2024-06-20',
    service: 'Vaccination',
    amount: '$50.00',
  },
  {
    id: 'hist-5',
    patientName: 'James Taylor',
    date: '2024-05-18',
    service: 'Wellness Visit',
    amount: '$120.00',
  },
];

export const doctors = [
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
    appointmentHistory: appointmentHistory.slice(0, 3),
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
    appointmentHistory: appointmentHistory.slice(3, 5),
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
    appointmentHistory: [],
  },
  {
    id: '4',
    name: 'Dr. Marcus Rodriguez',
    specialty: 'Dentist',
    avatarId: 'doctor-4',
    schedule: [{ time: '11:00 AM', patient: 'Ava Jones', status: 'Booked' }],
    appointmentHistory: [],
  },
];
