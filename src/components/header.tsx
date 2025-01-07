import logo from '@/assets/logo.svg'
import { Bell, UserRoundPlus } from 'lucide-react'

import { TeamSwitcher } from './team-switcher'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { getInitials } from '@/lib/get-name-initials'
import { getAuth } from '@/lib/auth'

export function Header() {

  const { user } = getAuth()

  return (
    <div className="flex items-center justify-between pt-6">
      <div className='flex items-center gap-4'>
        <img src={logo} alt="Logo mail.in" />
        <div className='h-6 w-[1px] bg-zinc-500' />
        <TeamSwitcher />
      </div>

      <div className='flex items-center gap-6'>
        <div className='relative'>
          <UserRoundPlus className='text-zinc-600 size-6' />
          <div
            className='absolute left-3 bottom-3 bg-red-500 rounded-full text-xs flex items-center justify-center w-4 h-4'
          >
            2
          </div>
        </div>

        <div className='border border-zinc-600 items-center justify-center relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full'>
          <Bell className='text-zinc-600 size-5' />
        </div>

        <Avatar className='size-8'>
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
      </div>
    </div>
  )
}