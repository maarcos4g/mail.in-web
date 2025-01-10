import { AtSign, ChevronDown, ChevronUp, MailPlus, UserRoundPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup
} from "./ui/dropdown-menu";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AddTeamMemberSheet } from "./add-team-member-sheet";

export function AddNewAction() {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className="bg-green-100 rounded-md px-4 py-2 flex items-center gap-4 text-zinc-800 text-sm font-medium"
        >
          Adicionar novo...
          {open ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="center"
        sideOffset={16}
        className='bg-zinc-950 text-zinc-100 border-zinc-600 border-2 py-2 px-4 flex flex-col gap-4 rounded-[16px] outline-none focus-visible:ring-2 focus-visible:ring-primary'
      >
        <DropdownMenuGroup
        >
          <Link
            to={'/'}
            className='w-full py-4 flex gap-2 items-center text-sm font-semibold text-zinc-200 border-b-2 border-zinc-600'
          >
            <AtSign className='size-4' />
            Lista de e-mail
          </Link>
          
          <Link
            to={'/'}
            className='w-full py-4 flex gap-2 items-center text-sm font-semibold text-zinc-200 border-b-2 border-zinc-600'
          >
            <MailPlus className='size-4' />
            E-mail
          </Link>
          
          <AddTeamMemberSheet />

        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu >
  )
}