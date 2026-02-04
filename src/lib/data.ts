export const patients = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@wellness.com',
    lastVisit: '2024-07-10',
    status: 'Active',
    totalSpent: '2500.75',
    avatarId: 'user-avatar-1',
  },
  {
    id: '2',
    name: 'Michael Smith',
    email: 'michael.s@nutrition.org',
    lastVisit: '2024-06-22',
    status: 'Active',
    totalSpent: '1500.00',
    avatarId: 'user-avatar-2',
  },
  {
    id: '3',
    name: 'Emily Davis',
    email: 'emily.d@holistic.net',
    lastVisit: '2023-11-05',
    status: 'Inactive',
    totalSpent: '350.50',
    avatarId: 'user-avatar-3',
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david.w@vitality.com',
    lastVisit: '2024-07-01',
    status: 'Active',
    totalSpent: '5800.00',
    avatarId: 'user-avatar-4',
  },
  {
    id: '5',
    name: 'Jessica Brown',
    email: 'jessica.b@ayurveda.co',
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
    doctorName: 'Guru Carter',
    time: '09:00 AM',
    type: 'Nutrition Review',
    avatarId: 'user-avatar-1',
  },
  {
    id: '2',
    patientName: 'Olivia Smith',
    doctorName: 'Dr. Adams',
    time: '09:30 AM',
    type: 'Vitality Check',
    avatarId: 'user-avatar-2',
  },
  {
    id: '3',
    patientName: 'Noah Williams',
    doctorName: 'Guru Carter',
    time: '10:00 AM',
    type: 'Herbology Sync',
    avatarId: 'user-avatar-3',
  },
];

export const orders = [
  {
    id: 'ORD-WELL-01',
    customer: 'Sarah Johnson',
    date: '2024-07-28T14:30:00Z',
    total: 89.50,
    status: 'Processing',
    items: 3
  },
  {
    id: 'ORD-WELL-02',
    customer: 'Michael Smith',
    date: '2024-07-28T15:45:00Z',
    total: 120.00,
    status: 'Completed',
    items: 1
  },
  {
    id: 'ORD-WELL-03',
    customer: 'Emily Davis',
    date: '2024-07-27T10:15:00Z',
    total: 245.75,
    status: 'Pending',
    items: 5
  },
];

export const users = [
  { id: 'u1', name: 'Ayubhyava Admin', email: 'admin@ayubhyava.com', role: 'Admin', status: 'Active', joinedDate: '2023-01-01', avatarId: 'user-avatar-1', loginMethod: 'Email', accountId: 'AYU-001', lastLogin: '2024-07-28 10:00 AM' },
  { id: 'u2', name: 'Emily Carter', email: 'e.carter@wellbeing.com', role: 'Nutritionist', status: 'Active', joinedDate: '2023-05-15', avatarId: 'doctor-1', loginMethod: 'Email', accountId: 'AYU-002', lastLogin: '2024-07-28 09:30 AM' },
  { id: 'u3', name: 'John Doe', email: 'john.doe@vitality.com', role: 'Member', status: 'Active', joinedDate: '2024-01-15', avatarId: 'user-avatar-2', loginMethod: 'Phone', accountId: 'AYU-003', lastLogin: '2024-07-27 02:15 PM' },
];

export const doctors = [
  {
    id: '1',
    name: 'Emily Carter',
    specialty: 'Nutrition Specialist',
    avatarId: 'doctor-1',
    schedule: [
      { time: '09:00 AM', patient: 'Liam Johnson', status: 'Booked' },
      { time: '11:00 AM', patient: '', status: 'Available' },
    ],
    appointmentHistory: [],
  },
];