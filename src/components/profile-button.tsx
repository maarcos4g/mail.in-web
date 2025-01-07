import { getAuth } from '@/lib/auth'
import { getInitials } from '@/lib/get-name-initials'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { LogOut, UserRoundCog, UsersRound } from 'lucide-react'

import { Link } from 'react-router-dom'

export function ProfileButton() {

  const { user, isLoading } = getAuth()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>

        {isLoading ? (
          <Skeleton className='size-8 rounded-full' />
        ) : (
          <Avatar className='size-8 cursor-pointer'>
            {user && user?.avatarUrl != null ? (
              <AvatarImage
                src={user.avatarUrl}
                alt=""
              />
            ) : (
              <>
                <AvatarFallback>
                  {user?.fullName && getInitials(user.fullName)}
                </AvatarFallback>
              </>
            )}
          </Avatar>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        sideOffset={12}
        className='bg-zinc-950 text-zinc-100 border-zinc-600 border-2 py-2 flex flex-col items-start justify-start gap-2 outline-none focus-visible:ring-2 focus-visible:ring-primary'
      >
        <DropdownMenuGroup
          className='p-2 flex flex-col items-start text-start'
        >
          <DropdownMenuLabel className="flex flex-col items-start text-left">
            <div className='flex items-center gap-2.5 border-b-2 border-zinc-600'>
              <Avatar className='size-10'>
                {user && user?.avatarUrl != null ? (
                  <AvatarImage
                    src={user.avatarUrl}
                    alt=""
                  />
                ) : (
                  <>
                    <AvatarFallback>
                      {user?.fullName && getInitials(user.fullName)}
                    </AvatarFallback>
                  </>
                )}
              </Avatar>

              <div className='flex flex-col gap-2 mb-2'>
                <span className='text-base font-bold text-zinc-200'>
                  Olá, {user?.firstName}
                </span>
                <span className='text-xs text-zinc-600 font-medium'>
                  {user?.email}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>

          <Link
          to={'/'}
          className='w-full py-4 flex items-center justify-between text-sm font-semibold text-zinc-200'
          >
            Configurações da conta
            <UserRoundCog className='size-4' />
          </Link>
          
          <Link
          to={'/'}
          className='w-full py-4 flex items-center justify-between text-sm font-semibold text-zinc-200'
          >
            Criar novo time
            <UsersRound className='size-4' />
          </Link>
          
          <Link
          to={'/'}
          className='w-full py-4 flex items-center justify-between text-sm font-semibold text-zinc-200'
          >
            Sair
            <LogOut className='size-4' />
          </Link>

          <DropdownMenuSeparator className='bg-zinc-600 h-0.5 w-full' />
          
          <Link
          to={'/'}
          className='w-full py-2 flex items-center justify-center text-sm font-semibold text-zinc-900 bg-zinc-200 rounded-md mt-4'
          >
            Upgrade
          </Link>

        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu >
  )
}