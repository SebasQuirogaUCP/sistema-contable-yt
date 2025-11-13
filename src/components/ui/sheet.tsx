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
  const [isVisible, setIsVisible] = React.useState(false)
  const [shouldRender, setShouldRender] = React.useState(false)

  React.useEffect(() => {
    if (open) {
      setShouldRender(true)
      setTimeout(() => setIsVisible(true), 10)
      document.body.style.overflow = "hidden"
    } else {
      setIsVisible(false)
      setTimeout(() => setShouldRender(false), 200)
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  if (!shouldRender) return null

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isVisible
          ? "bg-black/60 backdrop-blur-sm"
          : "bg-black/0 backdrop-blur-0"
      }`}
      onClick={() => onOpenChange?.(false)}
    >
      {children}
    </div>
  )
}

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ className, side = "left", children, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false)
    
    React.useEffect(() => {
      setTimeout(() => setIsVisible(true), 10)
    }, [])

    const sideClasses = {
      left: "left-0 top-0 h-full border-r border-slate-200/60",
      right: "right-0 top-0 h-full border-l border-slate-200/60",
      top: "top-0 left-0 w-full border-b border-slate-200/60",
      bottom: "bottom-0 left-0 w-full border-t border-slate-200/60",
    }

    const transformClasses = {
      left: isVisible ? "translate-x-0" : "-translate-x-full",
      right: isVisible ? "translate-x-0" : "translate-x-full",
      top: isVisible ? "translate-y-0" : "-translate-y-full",
      bottom: isVisible ? "translate-y-0" : "translate-y-full",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "fixed z-50 bg-white/98 backdrop-blur-xl p-0 shadow-2xl transition-transform duration-300",
          sideClasses[side],
          transformClasses[side],
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

