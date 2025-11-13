import { Menu } from "lucide-react";
import { useState } from "react";
import { MenuContent } from "./MenuContent";
import { Button } from "./ui/button";
import { Sheet, SheetContent } from "./ui/sheet";

export function Sidebar() {
  const [isMobile, setMobile] = useState(false);

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobile(true)}
          className="bg-white/90 backdrop-blur-sm shadow-lg border-slate-200/50 hover:bg-white text-slate-700"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <Sheet open={isMobile} onOpenChange={setMobile}>
        <SheetContent side="left" className="w-72 p-0 border-slate-200/60">
          <MenuContent />
        </SheetContent>
      </Sheet>

      <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 lg:z-40">
        <MenuContent />
      </aside>
    </>
  );
}
