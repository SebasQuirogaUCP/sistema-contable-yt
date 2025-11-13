import { useTransactionStore } from "@/store/transactionStore";
import {
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  DollarSign,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export const StatsGrid = () => {
  const transactions = useTransactionStore((state) => state.transactions);

  const stats = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "ingreso")
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
      .filter((t) => t.type === "gasto")
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;

    return { income, expenses, balance, count: transactions.length };
  }, [transactions]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-0 shadow-lg shadow-green-500/10 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300 hover:scale-[1.02]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold text-green-700 dark:text-green-400">
            Ingresos Totales
          </CardTitle>
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-700 dark:text-green-400">
            $
            {stats.income.toLocaleString("es-ES", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <p className="text-xs text-green-600/70 dark:text-green-400/70 mt-1 flex items-center gap-1">
            <ArrowUpRight className="h-3 w-3" />
            Total acumulado
          </p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg shadow-red-500/10 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20 hover:shadow-xl hover:shadow-red-500/20 transition-all duration-300 hover:scale-[1.02]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold text-red-700 dark:text-red-400">
            Gastos Totales
          </CardTitle>
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/30">
            <TrendingDown className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-red-700 dark:text-red-400">
            $
            {stats.expenses.toLocaleString("es-ES", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <p className="text-xs text-red-600/70 dark:text-red-400/70 mt-1 flex items-center gap-1">
            <ArrowDownRight className="h-3 w-3" />
            Total acumulado
          </p>
        </CardContent>
      </Card>

      <Card
        className={`border-0 shadow-lg transition-all duration-300 hover:scale-[1.02] ${
          stats.balance >= 0
            ? "shadow-blue-500/10 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 hover:shadow-xl hover:shadow-blue-500/20"
            : "shadow-orange-500/10 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 hover:shadow-xl hover:shadow-orange-500/20"
        }`}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle
            className={`text-sm font-semibold ${
              stats.balance >= 0
                ? "text-blue-700 dark:text-blue-400"
                : "text-orange-700 dark:text-orange-400"
            }`}
          >
            Balance
          </CardTitle>
          <div
            className={`h-10 w-10 rounded-lg flex items-center justify-center shadow-lg ${
              stats.balance >= 0
                ? "bg-gradient-to-br from-blue-500 to-cyan-600 shadow-blue-500/30"
                : "bg-gradient-to-br from-orange-500 to-amber-600 shadow-orange-500/30"
            }`}
          >
            <DollarSign className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div
            className={`text-3xl font-bold ${
              stats.balance >= 0
                ? "text-blue-700 dark:text-blue-400"
                : "text-orange-700 dark:text-orange-400"
            }`}
          >
            $
            {stats.balance.toLocaleString("es-ES", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <p
            className={`text-xs mt-1 flex items-center gap-1 ${
              stats.balance >= 0
                ? "text-blue-600/70 dark:text-blue-400/70"
                : "text-orange-600/70 dark:text-orange-400/70"
            }`}
          >
            {stats.balance >= 0 ? (
              <>
                <ArrowUpRight className="h-3 w-3" />
                Positivo
              </>
            ) : (
              <>
                <ArrowDownRight className="h-3 w-3" />
                Negativo
              </>
            )}
          </p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg shadow-purple-500/10 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold text-purple-700 dark:text-purple-400">
            Transacciones
          </CardTitle>
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Calendar className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-purple-700 dark:text-purple-400">
            {stats.count}
          </div>
          <p className="text-xs text-purple-600/70 dark:text-purple-400/70 mt-1">
            Registros totales
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
