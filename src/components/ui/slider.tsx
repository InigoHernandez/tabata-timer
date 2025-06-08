
import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center py-4",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className={cn(
      "relative h-0.5 w-full grow overflow-hidden rounded-full",
      props.disabled ? "bg-[#B2B2B3] bg-opacity-15" : "bg-[#B2B2B3] bg-opacity-15"
    )}>
      <SliderPrimitive.Range className={cn(
        "absolute h-full",
        props.disabled ? "bg-[#B2B2B3] bg-opacity-30" : "bg-primary"
      )} style={{ height: '2px' }} />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className={cn(
      "block h-5 w-5 rounded-full ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-110 transition-transform cursor-pointer",
      props.disabled ? "bg-[#B2B2B3] bg-opacity-60" : "bg-primary"
    )} />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
