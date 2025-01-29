import { GetEmails } from "@/api/get-emails";
import { AddNewAction } from "@/components/add-new-action-drop";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { IconButton } from "@/components/email/icon-button";
import { Status } from "@/components/email/status-widget";
import { TableHeaders } from "@/components/email/table-headers";
import { SkeletonTable } from "@/components/skeletons/skeleton-emails-table";
import { Table } from "@/components/table";
import { TableCell } from "@/components/table/table-cell";
import { TableRow } from "@/components/table/table-row";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  SendHorizonal,
  SquarePen,
  Trash2
} from "lucide-react";
import { useParams } from "react-router-dom";

export function EmailHome() {
  const { emailListId } = useParams()

  const {
    data: emails,
    isLoading
  } = useQuery({
    queryKey: ['getEmails', emailListId],
    queryFn: () => GetEmails({ emailListId: emailListId! })
  })

  if (isLoading) {
    return <SkeletonTable />
  }

  return (
    <div className="min-h-full w-full mt-8 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <h1 className="text-xl font-bold">E-mails</h1>
          <div className="px-3 w-72 py-1.5 border border-dashed border-zinc-700 rounded-full flex items-center gap-3">
            <Search className="size-4 text-zinc-500" />
            <input
              className="bg-transparent focus:ring-0 flex-1 outline-none border-0 p-0 text-sm"
              placeholder="Buscar..."
            // value={search}
            // onChange={onSearchInputChanged}
            />
          </div>
        </div>

        <AddNewAction />
      </div>

      <Table>
        <TableHeaders />

        <tbody>
          {emails && emails.map((email) => {
            return (
              <TableRow key={email.id}>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-sm text-zinc-300">
                      {email.subject}
                    </span>
                    <span className="text-xs text-zinc-600">{email.emailList.senders.length} contatos neste e-mail</span>
                  </div>
                </TableCell>

                <TableCell>
                  <Status status={email.status} />
                </TableCell>
                <TableCell>{dayjs(email.createdAt).fromNow()}</TableCell>
                <TableCell>{email.sentAt ? dayjs(email.sentAt).fromNow() : ''}</TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-end">
                    {!email.sentAt && (
                      <IconButton
                        transparent
                        className="bg-black/70 border border-white/10 rounded-md p-1.5"
                      >
                        <SendHorizonal className="size-4 text-zinc-300" />
                      </IconButton>
                    )}

                    <IconButton
                      transparent
                      className="bg-black/70 border border-white/10 rounded-md p-1.5"
                    >
                      <SquarePen className="size-4 text-zinc-300" />
                    </IconButton>

                    <ConfirmDeleteDialog
                      confirmAction={async () => console.log('Deletou')}
                      isLoading={true}
                      title="Deseja mesmo excluir esse e-mail?"
                      subtitle="Não é possível reverter esta ação"
                    >
                      <IconButton
                        transparent
                        className="bg-black/70 border border-white/10 rounded-md p-1.5"
                      >
                        <Trash2 className="size-4 text-rose-500" />
                      </IconButton>
                    </ConfirmDeleteDialog>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </tbody>

        <tfoot>
          <tr>
            <TableCell className="text-zinc-500" colSpan={3}>
              Exibindo 10 de 10 itens
            </TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span className="text-zinc-500">
                  Página {1} de {10}
                </span>

                <div className="flex gap-1.5">
                  <IconButton
                    transparent
                  >
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton
                    transparent
                  >
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton
                    transparent
                  >
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton
                    transparent
                  >
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  )
}