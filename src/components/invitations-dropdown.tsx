import { Check, UserRoundPlus, X } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { useQuery } from '@tanstack/react-query'
import { GetMyInvitations } from '@/api/get-my-invitations'

export function InvitationsDropdown() {

  const {
    data: invites,
    isLoading,
  } = useQuery({
    queryKey: ['getInvitations'],
    queryFn: () => GetMyInvitations()
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='relative'>
        <UserRoundPlus className='text-zinc-600 size-6' />
        {invites && (
          <div
            className='absolute left-3 bottom-3 bg-red-500 rounded-full text-xs flex items-center justify-center w-4 h-4'
          >
            {invites.length}
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        sideOffset={12}
        className='bg-zinc-950 text-zinc-100 border-zinc-600 border-2 px-4 py-2 flex flex-col gap-2 outline-none focus-visible:ring-2 focus-visible:ring-primary'
      >
        <DropdownMenuGroup
          className='p-2 flex flex-col items-start text-start'
        >
          <DropdownMenuLabel className='font-bold text-base mb-3'>Solicitações</DropdownMenuLabel>

          {invites?.map((invite) => {
            return (
              <div className='flex flex-col gap-3'>
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
                  <button
                    className='py-1 px-2 rounded-sm bg-red-500'
                  >
                    <X className='size-4 text-white' />
                  </button>
                  <button
                    className='py-1 px-2 rounded-sm bg-green-500'
                  >
                    <Check className='size-4 text-white' />
                  </button>
                </div>
              </div>
            )
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}