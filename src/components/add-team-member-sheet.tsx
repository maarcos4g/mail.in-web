import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Forward, Loader2, MailPlus, UserRoundPlus } from "lucide-react"
import { TeamMembers } from "./invites/team-members"
import { PendingInvites } from "./invites/pending-invites"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { getCurrentTeamId } from "@/lib/get-current-team-id"
import { CreateInvite } from "@/api/create-invite"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

const inviteMemberSchema = z.object({
  guestEmail: z.string({ message: 'Insira uma string' }).email({ message: 'Insira um e-mail válido' }),
})

type InviteMemberSchema = z.infer<typeof inviteMemberSchema>

export function AddTeamMemberSheet() {
  const { teamId } = getCurrentTeamId()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors }
  } = useForm<InviteMemberSchema>({
    resolver: zodResolver(inviteMemberSchema)
  })

  const { mutateAsync: createInvite } = useMutation({
    mutationFn: CreateInvite
  })

  async function handleCreateInvite({ guestEmail }: InviteMemberSchema) {
    try {
      await createInvite({ guestEmail, teamId: teamId! })
      setValue('guestEmail', '')

      toast.dismiss('invite-error')
      toast.success('Convite enviado com sucesso!', {id: 'success'})
    } catch (error: any) {
      toast.dismiss('invite-error')

      const errorMessage =
        error.response?.status === 401
          ? error.response.data.message
          : error.response?.status === 500
            ? 'Ocorreu um erro no servidor durante o envio do convite.'
            : error.response.data.message || 'Ocorreu um erro desconhecido.';

      toast.error(errorMessage, {
        id: 'invite-error', // Garantir que só um toast seja exibido
      });
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className='w-full py-4 flex gap-2 items-center text-sm font-semibold text-zinc-200'
        >
          <UserRoundPlus className='size-4' />
          Membro no time
        </button>
      </SheetTrigger>

      <SheetContent
        className="bg-zinc-950 flex flex-col gap-8 border-zinc-900"
      >
        <SheetHeader className="gap-3">
          <SheetTitle className="text-zinc-200 font-bold text-lg">
            Adicionar membro no time
          </SheetTitle>
          <SheetDescription
            className="text-sm text-zinc-500"
          >
            Insira o e-mail do usuário que você deseja convidar para o time.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto space-y-8 custom-scroll-hide">
          <form
            onSubmit={handleSubmit(handleCreateInvite)}
            className="w-full bg-zinc-900 border-2 border-zinc-600 px-4 py-2 rounded-md gap-2 text-zinc-600 text-xs flex items-center"
          >
            <MailPlus
              className="size-4"
            />

            <input
              type="email"
              id="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              placeholder="Digite o e-mail"
              className="w-full bg-transparent focus:outline-none text-zinc-200 disabled:text-zinc-800/80 disabled:text-zinc-600"
              {...register('guestEmail')}
              disabled={isSubmitting}
            />

            <button type="submit">
              {isSubmitting ? (
                <Loader2 className="animate-spin size-4" />
              ) : (
                <Forward
                  className="size-4"
                />
              )}
            </button>
          </form>

          {errors.guestEmail && <span className="text-red-500 text-xs">{errors.guestEmail.message}</span>}

          <TeamMembers />

          <div className="w-full h-px bg-zinc-600" />

          <PendingInvites />
        </div>

        <SheetFooter className="mt-auto">
          <SheetClose
            className="border border-zinc-800 text-zinc-500 text-xs font-medium px-2.5 py-1.5 rounded-md"
          >
            Voltar
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}