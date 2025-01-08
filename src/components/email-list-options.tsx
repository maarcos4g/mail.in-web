import { AtSign, MailPlus, MoreHorizontal, Settings, Star, Trash2, UserRoundPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup
} from "./ui/dropdown-menu";
import { Link } from "react-router-dom";

export function EmailListOptions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="p-[6px] flex items-center justify-center rounded-md border-2 border-zinc-800"
        >
          <MoreHorizontal className="size-4 text-zinc-300" />
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
            className='w-full py-4 flex items-center justify-between text-sm font-semibold text-zinc-200 border-b-2 border-zinc-600'
          >
            Favoritos
            <Star className='size-4' />
          </Link>

          <Link
            to={'/'}
            className='w-full py-4 flex items-center justify-between text-sm font-semibold text-zinc-200 border-b-2 border-zinc-600'
          >
            Excluir
            <Trash2 className='size-4' />
          </Link>

          <Link
            to={'/'}
            className='w-full py-4 flex gap-2 items-center justify-between text-sm font-semibold text-zinc-200'
          >
            Configurações
            <Settings className='size-4' />
          </Link>

        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu >
  )
}