import { useState } from "react"
import { LayoutDashboard, Database, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent } from "./ui/sheet"
import { Button } from "./ui/button"

interface SidebarProps {
  activePage: "dashboard" | "datos"
  onPageChange: (page: "dashboard" | "datos") => void
}

export function Sidebar({ activePage, onPageChange }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const menuItems = [
    {
      id: "dashboard" as const,
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "datos" as const,
      label: "Datos",
      icon: Database,
    },
  ]

  const MenuContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-primary">Sistema Contable</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gestión Financiera
        </p>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activePage === item.id
          return (
            <button
              key={item.id}
              onClick={() => {
                onPageChange(item.id)
                setMobileOpen(false)
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileOpen(true)}
          className="bg-background"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <MenuContent />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:bg-background">
        <MenuContent />
      </aside>
    </>
  )
}

