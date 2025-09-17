import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { SentimentTrend } from '@/services/sentimentService';

interface SentimentChartProps {
  data: SentimentTrend[];
  isLoading?: boolean;
}

export const SentimentChart = ({ data, isLoading }: SentimentChartProps) => {
  if (isLoading) {
    return (
      <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center text-muted-foreground">
        Chargement du graphique...
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center text-muted-foreground">
        Aucune donnée disponible
      </div>
    );
  }

  // Format dates for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      month: 'short',
      day: 'numeric'
    });
  };

  // Prepare data for chart
  const chartData = data.map(item => ({
    ...item,
    date: formatDate(item.date),
    fullDate: item.date
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{
      color: string;
      name: string;
      value: number;
    }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-border rounded-lg shadow-lg">
          <p className="font-medium text-foreground mb-2">{`Date: ${label}`}</p>
          {payload.map((entry, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${entry.value.toFixed(1)}%`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="date"
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="positive"
            stroke="#10b981"
            strokeWidth={3}
            name="Positif"
            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="neutral"
            stroke="#6b7280"
            strokeWidth={3}
            name="Neutre"
            dot={{ fill: '#6b7280', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#6b7280', strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="negative"
            stroke="#ef4444"
            strokeWidth={3}
            name="Négatif"
            dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};