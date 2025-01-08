import logo from '@/assets/logo.svg'
import { Bell } from 'lucide-react'

import { TeamSwitcher } from './team-switcher'
import { InvitationsDropdown } from './invitations-dropdown'
import { ProfileButton } from './profile-button'
import { toast } from 'sonner'
import { useLocation, useParams } from 'react-router-dom'
import { EmailListSwitcher } from './email-list-switcher'

export function Header() {
  const { pathname } = useLocation()
  const { emailListId } = useParams()

  let isEmailPage: boolean = false

  if (emailListId) {
    isEmailPage = pathname.includes(`/emails/${emailListId}`)
  }

  function handleNotifcationClick() {
    toast.info(`
      Essa funcionalidade está passando por uma pequena manutenção. Quando estiver disponível, avisaremos.`)
  }

  return (
    <div className="flex items-center justify-between pt-6">
      <div className='flex items-center gap-4'>
        <img src={logo} alt="Logo mail.in" />
        <div className='h-6 w-[1px] bg-zinc-500' />
        <TeamSwitcher />

        {isEmailPage && (
          <>
            <div className='h-6 w-[1.5px] bg-zinc-500 rotate-[25deg]' />
            <EmailListSwitcher />
          </>
        )}
      </div>

      <div className='flex items-center gap-6'>
        <InvitationsDropdown />

        <button onClick={handleNotifcationClick}>
          <div className='border border-zinc-600 items-center justify-center relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full'>
            <Bell className='text-zinc-600 size-5' />
          </div>
        </button>

        <ProfileButton />
      </div>
    </div>
  )
}