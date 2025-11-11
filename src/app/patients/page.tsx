import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/page-header';
import { PatientTable } from '@/components/patients/patient-table';
import { patients } from '@/lib/data';

export default function PatientsPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Patients">
        <Button>
          <PlusCircle />
          Add Patient
        </Button>
      </PageHeader>
      <PatientTable data={patients} />
    </div>
  );
}
