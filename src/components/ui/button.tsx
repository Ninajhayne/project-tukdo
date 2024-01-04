import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#F2602D] text-primary-foreground hover:bg-[#C44D24] dark:text-[#ffffff]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
          outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        outline2:
          "border border-input bg-[#ffffff] hover:bg-accent text-foreground hover:text-accent-foreground",
        outline_orange:
          "border border-input border-[#F2602D] bg-[#ffffff] text-[#F2602D] hover:bg-accent  hover:text-accent-[#F2602D]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost2: "hover:bg-[#C44D24] hover:text-[#ffffff]",  
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-emerald-600 text-white hover:bg-emerald-600/80",
        plaza_button: "bg-[#F2602D] text-white hover:bg-[#C44D24]",
        error: "bg-red-500 text-white hover:bg-red-500/80"
      }, 
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
