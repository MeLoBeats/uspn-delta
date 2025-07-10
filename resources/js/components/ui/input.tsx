import * as React from "react"

import { cn } from "@/lib/utils"
import { XIcon } from "lucide-react"

function Input({ containerClassName, isError, className, onClear, type, ...props }: React.ComponentProps<"input"> & { containerClassName?: string, onClear?: () => void, isError?: boolean }) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  return (
    <div className={cn("w-full relative", containerClassName)}>
      {(onClear && (inputRef.current?.value?.length ?? 0) > 0) && (
        <div onClick={onClear} className="absolute right-5 opacity-80 top-1/2 cursor-pointer transform -translate-y-1/2" >
          <XIcon />
        </div >
      )}
      <input
        type={type}
        ref={inputRef}
        data-slot="input"
        className={cn(
          "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-white px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className,
          isError && 'border-red-500'
        )}
        {...props}
      />
    </div >
  )
}

export { Input }
