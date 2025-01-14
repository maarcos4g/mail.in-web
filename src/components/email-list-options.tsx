import { MoreHorizontal, Settings, Star, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup
} from "./ui/dropdown-menu";
import { Link } from "react-router-dom";
import { getCurrentTeam } from "@/lib/get-current-team";
import { getAuth } from "@/lib/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteEmailList } from "@/api/delete-email-list";
import { ConfirmDeleteDialog } from "./confirm-delete-dialog";
import { toast } from "sonner";

interface EmailListOptionsProps {
  ownerId: string
  emailListId: string
}

export function EmailListOptions({ ownerId, emailListId }: EmailListOptionsProps) {
  const { ownerId: teamOwnerId, teamId } = getCurrentTeam() || {}
  const { user } = getAuth()
  const queryClient = useQueryClient()

  const isOwner = user?.id === ownerId || user?.id === teamOwnerId;

  const { mutateAsync: deleteEmailList, isPending: isLoading } = useMutation({
    mutationFn: DeleteEmailList,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getEmailLists', teamId, 0],
        exact: true,
        refetchType: 'active'
      })
    }
  })

  async function handleDeleteEmailList(emailListId: string) {
    try {
      await deleteEmailList({ emailListId })
      toast.success('Lista de e-mail deletada com sucesso!')
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          onClick={(event) => event.stopPropagation()}
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
          {/* <Link
            to={'/'}
            className='w-full py-4 flex items-center justify-between text-sm font-semibold text-zinc-200 border-b-2 border-zinc-600'
            onClick={(event) => event.stopPropagation()}
          >
            Favoritos
            <Star className='size-4' />
          </Link> */}

          {isOwner && (
            <ConfirmDeleteDialog
              title="Deseja mesmo excluir a lista de e-mail?"
              subtitle="Todos os e-mails e remetentes adicionados serão perdidos permanentemente"
              confirmAction={async () => handleDeleteEmailList(emailListId)}
              isLoading={isLoading}
            >
              <button
                onClick={(event) => event.stopPropagation()}
                className='w-full py-4 flex items-center justify-between text-sm font-semibold text-zinc-200 border-b-2 border-zinc-600'
              >
                Excluir
                <Trash2 className='size-4' />
              </button>
            </ConfirmDeleteDialog>
          )}

          <Link
            to={'/'}
            className='w-full py-4 flex gap-2 items-center justify-between text-sm font-semibold text-zinc-200'
            onClick={(event) => event.stopPropagation()}
          >
            Configurações
            <Settings className='size-4' />
          </Link>

        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu >
  )
}