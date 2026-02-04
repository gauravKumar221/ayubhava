'use client';

import { useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { 
  Calendar as CalendarIcon, 
  ChevronDown,
  Clock,
  CalendarDays,
  CalendarRange,
  CalendarCheck
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

const chartData = [
  { date: '2024-07-01', visitors: 234 },
  { date: '2024-07-02', visitors: 289 },
  { date: '2024-07-03', visitors: 312 },
  { date: '2024-07-04', visitors: 354 },
  { date: '2024-07-05', visitors: 321 },
  { date: '2024-07-06', visitors: 410 },
  { date: '2024-07-07', visitors: 456 },
  { date: '2024-07-08', visitors: 401 },
  { date: '2024-07-09', visitors: 489 },
  { date: '2024-07-10', visitors: 502 },
  { date: '2024-07-11', visitors: 530 },
  { date: '2024-07-12', visitors: 512 },
];

const chartConfig = {
  visitors: {
    label: 'Visitors',
    color: 'hsl(var(--primary))',
  },
};

export function AnalyticsChart() {
  const [timeRange, setTimeRange] = useState('Last 30 Days');

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Visitor Analytics</CardTitle>
          <CardDescription>Daily visitor trends</CardDescription>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 gap-2 font-semibold">
              <CalendarIcon className="h-4 w-4 text-primary" />
              <span>{timeRange}</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px]">
            <DropdownMenuItem onClick={() => setTimeRange('Today')}>
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              Today
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTimeRange('Last 7 Days')}>
              <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
              Last 7 Days
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTimeRange('Last 30 Days')}>
              <CalendarRange className="mr-2 h-4 w-4 text-muted-foreground" />
              Last 30 Days
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTimeRange('This Year')}>
              <CalendarCheck className="mr-2 h-4 w-4 text-muted-foreground" />
              This Year
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Line
              dataKey="visitors"
              type="natural"
              stroke="var(--color-visitors)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
