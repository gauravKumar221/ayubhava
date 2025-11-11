import { ReportGenerator } from '@/components/reports/report-generator';
import { PageHeader } from '@/components/shared/page-header';

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="AI-Driven Report Generator"
        description="Generate summaries and key points from unstructured notes."
      />
      <ReportGenerator />
    </div>
  );
}
