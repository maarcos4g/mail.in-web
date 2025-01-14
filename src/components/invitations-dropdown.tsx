import { useState } from 'react'

import { Check, Loader2, UserRoundPlus, X } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'
import { ConfirmRevokeDialog } from './invites/confirm-revoke'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { GetInvitations } from '@/api/get-invitations'
import { AcceptInvite } from "@/api/accept-invite";
import { toast } from 'sonner'
import emptyState from '@/assets/empty-state.svg'

export function InvitationsDropdown() {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const queryClient = useQueryClient()

  const {
    data: invites,
    isLoading,
  } = useQuery({
    queryKey: ['getInvitations'],
    queryFn: () => GetInvitations(),
    staleTime: 15,
  })

  const { mutateAsync: acceptInvite, isSuccess } = useMutation({
    mutationFn: AcceptInvite,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getInvitations'],
        exact: true,
        refetchType: 'active'
      })
    }
  })

  async function handleAcceptInvite(inviteId: string) {
    try {
      setLoadingStates((prev) => ({ ...prev, [inviteId]: true }))
      await acceptInvite({ inviteId })
      toast.success('Convite aceito com sucesso!')
    } catch (error: any) {
      const errorMessage =
        error.response?.status === 401
          ? error.response.data.message
          : error.response?.status === 500
            ? 'Ocorreu um erro no servidor enquanto aceitava o convite.'
            : error.response.data.message || 'Ocorreu um erro desconhecido.';

      toast.error(errorMessage);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [inviteId]: false }))
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='relative'>
        {isLoading ? (
          <Skeleton className='size-8 rounded-full' />
        ) : (
          <>
            <UserRoundPlus className='text-zinc-600 size-6' />
            {invites && invites.length > 0 && (
              <div
                className='absolute left-3 bottom-3 bg-red-500 rounded-full text-xs flex items-center justify-center w-4 h-4'
              >
                {invites.length}
              </div>
            )}
          </>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        sideOffset={12}
        className='bg-zinc-950 text-zinc-100 border-zinc-600 border-2 py-2 flex flex-col gap-2 outline-none focus-visible:ring-2 focus-visible:ring-primary'
      >
        <DropdownMenuGroup
          className='p-2 flex flex-col items-start text-start'
        >
          <DropdownMenuLabel className='font-bold text-base mb-3'>Solicitações</DropdownMenuLabel>

          {isLoading && (
            <Loader2 className='animate-spin text-zinc-600' />
          )}

          {invites && invites.map((invite) => {
            return (
              <div className='flex flex-col gap-3' key={invite.id}>
                <div className='flex items-center gap-2'>
                  <div className='rounded-full p-2 border border-zinc-200'>
                    <UserRoundPlus className='size-4 text-zinc-200' />
                  </div>
                  <div>
                    <span className='font-semibold text-base text-zinc-200'>
                      {invite.team.name}
                    </span>
                    <p className='text-[10px] text-zinc-600'>
                      <strong>{invite.inviter.firstName}</strong> te convidou para o time <strong>{invite.team.slug}</strong>
                    </p>
                  </div>
                </div>

                <DropdownMenuSeparator className='bg-zinc-600' />
                <div className='w-full flex gap-4 items-center justify-end'>
                  <ConfirmRevokeDialog
                    inviteId={invite.id}
                  >
                    <button
                      className='py-1 px-2 rounded-sm bg-red-500'
                    >
                      <X className='size-4 text-white' />
                    </button>
                  </ConfirmRevokeDialog>

                  <button
                    className='py-1 px-2 rounded-sm bg-green-500'
                    onClick={async () => await handleAcceptInvite(invite.id)}
                  >
                    {loadingStates[invite.id] ? (
                      <Loader2 className='animate-spin size-4' />
                    ) : (
                      <Check className='size-4 text-white' />
                    )}
                  </button>
                </div>
              </div>
            )
          })}

          {invites?.length === 0 && (
            <div className='flex flex-col items-center'>
              <img
                src={emptyState}
                alt=""
                className="size-20"
              />

              <h1
                className="text-center text-zinc-600 text-sm"
              >
                Você não tem convites pendentes.
              </h1>
            </div>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}