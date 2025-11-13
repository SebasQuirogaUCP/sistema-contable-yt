import * as React from "react"
import { cn } from "@/lib/utils"

interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
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
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible
          ? "bg-black/70 backdrop-blur-md"
          : "bg-black/0 backdrop-blur-0"
      }`}
      onClick={() => onOpenChange?.(false)}
    >
      {children}
    </div>
  )
}

const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => setIsVisible(true), 10)
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        "relative z-50 grid w-full max-w-lg gap-4 border-0 bg-white/98 backdrop-blur-xl p-0 shadow-2xl sm:rounded-2xl overflow-hidden transition-all duration-300",
        isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0",
        className
      )}
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      {children}
    </div>
  )
})
DialogContent.displayName = "DialogContent"

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = "DialogDescription"

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription }

