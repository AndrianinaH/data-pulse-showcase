import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

interface SentimentDistributionChartProps {
  data: {
    positive: number;
    neutral: number;
    negative: number;
  };
  isLoading?: boolean;
}

export const SentimentDistributionChart = ({ data, isLoading }: SentimentDistributionChartProps) => {
  if (isLoading) {
    return (
      <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center text-muted-foreground">
        Chargement...
      </div>
    );
  }

  const chartData = [
    {
      name: 'Positif',
      value: data.positive,
      color: '#10b981'
    },
    {
      name: 'Neutre',
      value: data.neutral,
      color: '#6b7280'
    },
    {
      name: 'Négatif',
      value: data.negative,
      color: '#ef4444'
    }
  ];

  const COLORS = ['#10b981', '#6b7280', '#ef4444'];

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: {
    active?: boolean;
    payload?: Array<{
      name: string;
      value: number;
    }>;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border border-border rounded-lg shadow-lg">
          <p className="font-medium text-foreground">
            {`${data.name}: ${data.value.toFixed(1)}%`}
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom label
  const renderLabel = (entry: { value: number }) => {
    return `${entry.value.toFixed(1)}%`;
  };

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(value, entry: { color: string }) => (
              <span style={{ color: entry.color }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};