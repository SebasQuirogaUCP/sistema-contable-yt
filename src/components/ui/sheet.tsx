import * as React from "react"
import { cn } from "@/lib/utils"

interface SheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "left" | "right" | "top" | "bottom"
}

const Sheet = ({ open, onOpenChange, children }: SheetProps) => {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50"
      onClick={() => onOpenChange?.(false)}
    >
      {children}
    </div>
  )
}

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ className, side = "left", children, ...props }, ref) => {
    const sideClasses = {
      left: "left-0 top-0 h-full border-r",
      right: "right-0 top-0 h-full border-l",
      top: "top-0 left-0 w-full border-b",
      bottom: "bottom-0 left-0 w-full border-t",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "fixed z-50 bg-background p-6 shadow-lg transition-transform",
          sideClasses[side],
          className
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    )
  }
)
SheetContent.displayName = "SheetContent"

export { Sheet, SheetContent }

