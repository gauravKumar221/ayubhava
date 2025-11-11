import {
  Activity,
  CalendarCheck2,
  DollarSign,
  Users,
} from 'lucide-react';

import { MetricCard } from '@/components/dashboard/metric-card';
import { AnalyticsChart } from '@/components/dashboard/analytics-chart';
import { AppointmentsList } from '@/components/dashboard/appointments-list';
import { PageHeader } from '@/components/shared/page-header';
import { PatientTable } from '@/components/patients/patient-table';
import { patients } from '@/lib/data';

export default function DashboardPage({ searchParams }) {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader title="Dashboard" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Revenue"
          value="$45,231.89"
          change="+20.1% from last month"
          icon={<DollarSign />}
        />
        <MetricCard
          title="Total Patients"
          value="2,350"
          change="+180.1% from last month"
          icon={<Users />}
        />
        <MetricCard
          title="Appointments"
          value="1,234"
          change="+19% from last month"
          icon={<CalendarCheck2 />}
        />
        <MetricCard
          title="Active Now"
          value="573"
          change="+201 since last hour"
          icon={<Activity />}
        />
      </div>
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <AnalyticsChart />
        </div>
        <AppointmentsList />
      </div>
      <PatientTable data={patients} />
    </div>
  );
}
