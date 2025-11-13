import { cn } from "@/lib/utils";
import { Database, LayoutDashboard } from "lucide-react";
import { Link, useLocation } from "react-router";

const menuItems = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    path: "/transacciones",
    label: "Transacciones",
    icon: Database,
  },
];

export const MenuContent = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full bg-white/98 backdrop-blur-xl border-r border-slate-200/60">
      <div className="p-6 border-b border-slate-200/50 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20">
            <LayoutDashboard className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Sistema Contable
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5 font-medium">
              Gestión Financiera
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              //   onClick={() => setMobile(false)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 relative group",
                isActive
                  ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/30 scale-[1.02]"
                  : "hover:bg-slate-100/80 text-slate-700 hover:scale-[1.01]"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-primary rounded-r-full" />
              )}
              <Icon
                className={cn(
                  "h-5 w-5 transition-transform duration-200",
                  isActive ? "scale-110" : "group-hover:scale-110"
                )}
              />
              <span
                className={cn(
                  "font-semibold text-sm",
                  isActive ? "text-primary-foreground" : "text-slate-700"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
