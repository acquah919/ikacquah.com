import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-transparent text-sm font-medium tracking-tight whitespace-nowrap transition-[background-color,border-color,color,transform] duration-300 ease-(--ease-editorial) outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-teal hover:text-white dark:hover:bg-teal-bright dark:hover:text-charcoal",
        outline:
          "border-foreground/25 bg-transparent text-foreground hover:border-foreground hover:bg-foreground hover:text-background",
        ghost:
          "text-foreground hover:bg-foreground/8",
        link: "h-auto rounded-none px-0 text-foreground underline decoration-foreground/30 underline-offset-[6px] hover:decoration-foreground",
      },
      size: {
        default: "h-11 px-6",
        lg: "h-13 px-8 text-[0.9375rem]",
        sm: "h-9 px-4 text-xs",
        icon: "size-11",
        "icon-sm": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
