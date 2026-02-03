import { PageHeader } from '@/components/shared/page-header.jsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.jsx';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { RevenueChart } from '@/components/payments/revenue-chart.jsx';

const transactions = [
  {
    invoice: 'INV001',
    patient: 'Liam Johnson',
    amount: '$250.00',
    status: 'Paid',
  },
  {
    invoice: 'INV002',
    patient: 'Olivia Smith',
    amount: '$150.00',
    status: 'Paid',
  },
  {
    invoice: 'INV003',
    patient: 'Noah Williams',
    amount: '$350.00',
    status: 'Pending',
  },
  {
    invoice: 'INV004',
    patient: 'Emma Brown',
    amount: '$450.00',
    status: 'Paid',
  },
  {
    invoice: 'INV005',
    patient: 'Ava Jones',
    amount: '$550.00',
    status: 'Paid',
  },
];

export default function PaymentsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader title="Payments" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Revenue (This Month)</CardTitle>
            <CardDescription>Total income from all sources.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$32,125.40</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Invoices</CardTitle>
            <CardDescription>Amount waiting for payment.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$3,450.00</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Avg. Treatment Value</CardTitle>
            <CardDescription>Average revenue per patient visit.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$350.75</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RevenueChart />
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>A list of the latest payments.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.invoice}>
                    <TableCell className="font-medium">
                      {transaction.invoice}
                    </TableCell>
                    <TableCell>{transaction.patient}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          transaction.status === 'Paid'
                            ? 'default'
                            : 'secondary'
                        }
                        className={
                          transaction.status === 'Paid'
                            ? 'bg-accent text-accent-foreground'
                            : ''
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}