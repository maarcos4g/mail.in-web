import { MailPlus } from 'lucide-react'
import { getCurrentEmailList } from '@/lib/get-current-email-list'

export function EmailListSwitcher() {
  const { emailListName } = getCurrentEmailList()
  return (
    <div
      className="flex gap-3 items-center bg-zinc-900 border-2 border-zinc-600 px-4 py-2.5 rounded-md"
    >
      <MailPlus className="ml-auto size-4 shrink-0 text-muted-foreground" />
      <span className="text-zinc-200 font-semibold text-sm">{emailListName}</span>
    </div>
  )
}