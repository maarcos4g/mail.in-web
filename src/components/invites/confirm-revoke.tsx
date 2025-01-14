import { RevokeInvite } from "@/api/revoke-invite"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { AlertDialogProps } from "@radix-ui/react-alert-dialog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CircleX, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface ConfirmRevokeProps extends AlertDialogProps {
  inviteId: string
}

export function ConfirmRevokeDialog({ children, inviteId, ...props }: ConfirmRevokeProps) {
  const queryClient = useQueryClient()

  const { mutateAsync: revokeInvite, isPending: revokeLoading } = useMutation({
    mutationFn: RevokeInvite,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getTeamInvites'],
        exact: true,
        refetchType: 'active'
      })
    },
  })

  async function handleRevokeInvite(inviteId: string) {
    try {
      await revokeInvite({ inviteId })
      toast.success('O convite foi removido com sucesso!')
    } catch (error: any) {
      const errorMessage =
        error.response?.status === 401
          ? error.response.data.message
          : error.response?.status === 500
            ? 'Ocorreu um erro no servidor durante exclusão do convite.'
            : error.response.data.message || 'Ocorreu um erro desconhecido.';

      toast.error(errorMessage);
    }
  }

  return (
    <AlertDialog {...props}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent
        className="bg-zinc-900 border-none shadow shadow-white/10"
      >

        <AlertDialogDescription>
          <div className="flex flex-col gap-7 items-center">

            <CircleX className="size-14 text-red-500" />

            <h1 className="text-xl text-center font-semibold text-zinc-300">
              Deseja mesmo excluir o convite?
            </h1>


            <div className="flex items-center justify-between min-w-full">
              <AlertDialogCancel className="bg-transparent text-zinc-500 border-zinc-800 hover:bg-transparent hover:text-zinc-500">
                Cancelar
              </AlertDialogCancel>

              <div
                className="p-0"
              >
                <button
                  type="submit"
                  className="flex items-center gap-1.5 bg-zinc-200 text-zinc-900 text-xs font-medium px-4 py-2  rounded-md disabled:bg-zinc-900 disabled:text-zinc-500 disabled:border disabled:border-zinc-700"
                  disabled={revokeLoading}
                  onClick={() => handleRevokeInvite(inviteId)}
                >
                  {revokeLoading
                    ? (
                      <Loader2 className="animate-spin" />
                    )
                    : (
                      <>
                        Confirmar
                      </>
                    )}
                </button>
              </div>
            </div>
          </div>
        </AlertDialogDescription>

      </AlertDialogContent>
    </AlertDialog>
  )
}