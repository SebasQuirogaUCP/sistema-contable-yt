import { ChartsGrid } from "./ChartsGrid";
import { StatsGrid } from "./StatsGrid";

export function Dashboard() {
  return (
    <div className="space-y-6 p-4 lg:p-8">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
          Dashboard
        </h2>
        <p className="text-muted-foreground text-lg">Resumen financiero</p>
      </div>

      <StatsGrid />

      <ChartsGrid />
    </div>
  );
}
