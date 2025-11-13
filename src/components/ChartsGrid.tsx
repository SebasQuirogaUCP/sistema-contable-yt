import { useTransactionStore } from "@/store/transactionStore";
import { useMemo } from "react";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export const ChartsGrid = () => {
  const transactions = useTransactionStore((state) => state.transactions);

  const monthlyData = useMemo(() => {
    const grouped = transactions.reduce((acc, t) => {
      const month = new Date(t.date).toLocaleDateString("es-ES", {
        month: "short",
        year: "numeric",
      });

      if (!acc[month]) {
        acc[month] = { month, income: 0, expenses: 0 };
      }

      if (t.type === "ingreso") {
        acc[month].income += t.amount;
      } else {
        acc[month].expenses += t.amount;
      }
      return acc;
    }, {} as Record<string, { month: string; income: number; expenses: number }>);

    return Object.values(grouped).sort((a, b) => {
      return new Date(a.month).getTime() - new Date(b.month).getTime();
    });
  }, [transactions]);

  const pieData = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "ingreso")
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === "gasto")
      .reduce((sum, t) => sum + t.amount, 0);

    return [
      { name: "Ingresos", value: income },
      { name: "Gastos", value: expenses },
    ];
  }, [transactions]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="border border-slate-200 bg-white">
        <CardHeader className="pb-4 border-b border-slate-100">
          <CardTitle className="text-lg font-semibold text-slate-900">
            Ingresos vs Gastos
          </CardTitle>
          <CardDescription className="text-sm text-slate-600 mt-1">
            Evolución mensual
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="month"
                stroke="#94a3b8"
                style={{ fontSize: "12px" }}
              />
              <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                }}
                formatter={(value: number) =>
                  `$${value.toLocaleString("es-ES", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`
                }
              />
              <Legend wrapperStyle={{ paddingTop: "16px" }} />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#059669"
                strokeWidth={2.5}
                name="Ingresos"
                dot={{ fill: "#059669", r: 3.5 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#dc2626"
                strokeWidth={2.5}
                name="Gastos"
                dot={{ fill: "#dc2626", r: 3.5 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border border-slate-200 bg-white">
        <CardHeader className="pb-4 border-b border-slate-100">
          <CardTitle className="text-lg font-semibold text-slate-900">
            Distribución
          </CardTitle>
          <CardDescription className="text-sm text-slate-600 mt-1">
            Ingresos y gastos
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 flex items-center justify-center">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === 0 ? "#059669" : "#dc2626"}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                }}
                formatter={(value: number) =>
                  `$${value.toLocaleString("es-ES", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
