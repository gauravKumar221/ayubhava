'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const chartData = [
  { month: 'Jan', revenue: 1860 },
  { month: 'Feb', revenue: 3050 },
  { month: 'Mar', revenue: 2370 },
  { month: 'Apr', revenue: 730 },
  { month: 'May', revenue: 2090 },
  { month: 'Jun', revenue: 2140 },
  { month: 'Jul', revenue: 3212 },
  { month: 'Aug', revenue: 2890 },
  { month: 'Sep', revenue: 3500 },
  { month: 'Oct', revenue: 4100 },
  { month: 'Nov', revenue: 3800 },
  { month: 'Dec', revenue: 4500 },
];

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--primary))',
  },
};

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>Monthly revenue for the current year</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              tickFormatter={(value) => `$${value / 1000}k`}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar
              dataKey="revenue"
              fill="var(--color-revenue)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
