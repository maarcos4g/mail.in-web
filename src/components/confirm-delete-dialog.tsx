import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { AlertDialogProps } from "@radix-ui/react-alert-dialog"
import { Ban } from "lucide-react"

interface ConfirmDeleteProps extends AlertDialogProps {
  title: string
  subtitle?: string
  confirmAction: () => Promise<void>
  isLoading: boolean
}

export function ConfirmDeleteDialog({ children, title, subtitle, confirmAction, isLoading, ...props }: ConfirmDeleteProps) {

  return (
    <AlertDialog {...props}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent
        className="bg-zinc-900 border-none shadow shadow-white/10"
      >

        <AlertDialogDescription>
          <div className="flex flex-col gap-7 items-center">

            <Ban className="size-[90px] text-red-500" />

            <h1 className="text-base text-center font-bold text-zinc-100">
              {title}
            </h1>

            {subtitle && <p className="text-sm text-center font-normal text-zinc-200">{subtitle}</p>}


            <div className="flex items-center justify-between min-w-full">
              <AlertDialogCancel 
              className="bg-transparent text-zinc-500 border-zinc-500 hover:bg-transparent hover:text-zinc-500"
              onClick={(event) => event.stopPropagation()}
              >
                Cancelar
              </AlertDialogCancel>

              <div
                className="p-0"
              >
                <button
                  type="submit"
                  className="flex items-center gap-1.5 bg-zinc-100 text-zinc-800 text-xs font-medium px-3 py-2.5  rounded-md disabled:bg-zinc-900 disabled:text-zinc-500 disabled:border disabled:border-zinc-700"
                  onClick={(event) => {
                    event.stopPropagation()
                    confirmAction()
                  }}
                  disabled={isLoading}

                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </AlertDialogDescription>

      </AlertDialogContent>
    </AlertDialog>
  )
}