"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"

function Toaster(props: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      position="bottom-center"
      toastOptions={{
        classNames: {
          toast: "!rounded-full !border-0 !bg-foreground !text-background !font-semibold",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
