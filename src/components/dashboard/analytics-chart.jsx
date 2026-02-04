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
  CalendarCheck,
  CalendarPlus
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { Calendar } from '@/components/ui/calendar';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';

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
  { date: '2024-07-13', visitors: 480 },
  { date: '2024-07-14', visitors: 520 },
  { date: '2024-07-15', visitors: 600 },
];

const chartConfig = {
  visitors: {
    label: 'Visitors',
    color: 'hsl(var(--primary))',
  },
};

export function AnalyticsChart() {
  const [timeRange, setTimeRange] = useState('Last 30 Days');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [customDate, setCustomDate] = useState({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  const handleCustomRangeSelect = (range) => {
    setCustomDate(range);
    if (range?.from && range?.to) {
      setTimeRange(`${format(range.from, 'MMM dd')} - ${format(range.to, 'MMM dd, yyyy')}`);
    }
  };

  const filteredData = chartData.filter(item => {
    const itemDate = new Date(item.date);
    if (timeRange === 'Today') {
      const today = new Date();
      return itemDate.toDateString() === today.toDateString();
    }
    if (timeRange === 'Last 7 Days') {
      const sevenDaysAgo = subDays(new Date(), 7);
      return itemDate >= sevenDaysAgo;
    }
    if (timeRange === 'Last 30 Days') {
      const thirtyDaysAgo = subDays(new Date(), 30);
      return itemDate >= thirtyDaysAgo;
    }
    if (timeRange === 'This Year') {
      const startOfYear = new Date(new Date().getFullYear(), 0, 1);
      return itemDate >= startOfYear;
    }
    // Custom range logic
    if (customDate?.from && customDate?.to) {
      return itemDate >= startOfDay(customDate.from) && itemDate <= endOfDay(customDate.to);
    }
    return true;
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Visitor Analytics</CardTitle>
          <CardDescription>Daily visitor trends</CardDescription>
        </div>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-2 font-semibold">
                <CalendarIcon className="h-4 w-4 text-primary" />
                <span className="max-w-[120px] truncate">{timeRange}</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
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
              <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                <CalendarPlus className="mr-2 h-4 w-4 text-primary" />
                Custom Range
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-fit p-6">
            <DialogHeader className="mb-4">
              <DialogTitle>Select Custom Date Range</DialogTitle>
            </DialogHeader>
            <Calendar
              mode="range"
              selected={customDate}
              onSelect={handleCustomRangeSelect}
              numberOfMonths={2}
              className="rounded-md border"
            />
            <div className="flex justify-end mt-4">
              <Button onClick={() => setIsDialogOpen(false)}>Apply Filter</Button>
            </div>
          </DialogContent>
        </Dialog>

        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart
            data={filteredData.length > 0 ? filteredData : [{ date: 'None', visitors: 0 }]}
            margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => value === 'None' ? '' : new Date(value).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
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
        {filteredData.length === 0 && (
          <p className="text-center text-xs text-muted-foreground mt-4 italic">
            No visitor data found for the selected time range.
          </p>
        )}
      </CardContent>
    </Card>
  );
}