import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const CATEGORICAL_COLORS = [
  '#2a78d6', // blue
  '#eb6834', // orange
  '#1baf7a', // aqua
  '#eda100', // yellow
  '#e87ba4', // magenta
  '#008300', // green
  '#4a3aa7', // violet
  '#e34948', // red
];

const OTHER_COLOR = '#898781';

interface Expense {
  amount: string;
  category: string;
}

interface CategoryTotal {
  category: string;
  total: number;
  fill: string;
}

function buildCategoryTotals(expenses: Expense[]): CategoryTotal[] {
  const totalsByCategory = new Map<string, number>();
  for (const expense of expenses) {
    const current = totalsByCategory.get(expense.category) ?? 0;
    totalsByCategory.set(expense.category, current + Number(expense.amount));
  }

  const sorted = [...totalsByCategory.entries()].sort((a, b) => b[1] - a[1]);
  const topCategories = sorted.slice(0, 8);
  const rest = sorted.slice(8);

  const totals: CategoryTotal[] = topCategories.map(([category, total], index) => ({
    category,
    total,
    fill: CATEGORICAL_COLORS[index],
  }));

  if (rest.length > 0) {
    const otherTotal = rest.reduce((sum, [, total]) => sum + total, 0);
    totals.push({ category: 'Outros', total: otherTotal, fill: OTHER_COLOR });
  }

  return totals;
}

export function CategoryChart({ expenses }: { expenses: Expense[] }) {
  const data = buildCategoryTotals(expenses);

  if (data.length === 0) {
    return <p style={{ color: '#898781' }}>Adicione despesas para ver o gráfico por categoria.</p>;
  }

  return (
    <div style={{ width: '100%', height: 280 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
          <CartesianGrid stroke="#e1e0d9" vertical={false} />
          <XAxis dataKey="category" stroke="#898781" tickLine={false} axisLine={{ stroke: '#c3c2b7' }} />
          <YAxis stroke="#898781" tickLine={false} axisLine={{ stroke: '#c3c2b7' }} />
          <Tooltip
            formatter={(value) => [`R$ ${Number(Array.isArray(value) ? value[0] : value).toFixed(2)}`, 'Total']}
            contentStyle={{
              background: '#fcfcfb',
              border: '1px solid #e1e0d9',
              borderRadius: 4,
              color: '#0b0b0b',
            }}
          />
          <Legend wrapperStyle={{ color: '#52514e' }} />
          <Bar dataKey="total" name="Total por categoria" radius={[4, 4, 0, 0]} maxBarSize={48}>
            {data.map((entry) => (
              <Cell key={entry.category} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
