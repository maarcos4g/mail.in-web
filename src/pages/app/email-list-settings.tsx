import { getCurrentTeam } from "@/lib/get-current-team";
import { Ban } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { GeneralConfigBox } from "@/components/email-list/general-config";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetEmailList } from "@/api/get-email-list";
import { getIsEmailListOwner } from "@/lib/get-is-email-list-owner";
import { getAuth } from "@/lib/auth";
import { DeleteEmailListBox } from "@/components/email-list/delete-email-list";

export function EmailListSettings() {
  const { emailListId } = useParams()
  const { user } = getAuth()
  const { ownerId: teamOwnerId } = getCurrentTeam() || {}

  const {
    data: emailList,
    isLoading
  } = useQuery({
    queryKey: ['getEmailList', emailListId],
    queryFn: () => GetEmailList({ emailListId: emailListId! })
  })

  if (isLoading) {
    return <h1>Carregando...</h1>
  }

  const isOwner = getIsEmailListOwner(emailList?.ownerId!, teamOwnerId!, user?.id!)

  return (
    <div
      className="min-h-full w-full mt-10 space-y-10 mb-4"
    >
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <h1 className="text-xl font-bold">Configurações da lista</h1>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Ban className="size-6 text-zinc-500 data-[disabled=true]:text-red-500" data-disabled={!isOwner} />
            </TooltipTrigger>
            <TooltipContent className="w-56">
              <p className="text-[10px]">O ícone ficará habilitado (vermelho) caso você não tenha permissão para editar as informações.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {emailList && <GeneralConfigBox emailList={emailList} isOwner={isOwner} />}

      <div className="space-y-4 border border-zinc-800 rounded-xl p-6">
        <div className="space-y-2 border-b border-zinc-800 pb-2">
          <h1 className="text-lg font-bold">Transferência</h1>
          <p className="text-sm text-zinc-500">
            Transfira a lista de e-mail para outra equipe sem tempo de inatividade ou interrupções no fluxo de trabalho.
          </p>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-10 py-2 bg-zinc-100 text-zinc-900 font-medium rounded-lg disabled:bg-zinc-900 disabled:text-zinc-500 disabled:border disabled:border-zinc-800"
                  disabled
                >
                  Transferir
                </button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-[10px]">Essa funcionalidade ainda não está disponível completamente.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {emailList && <DeleteEmailListBox emailListId={emailList?.id} isOwner={isOwner} />}
    </div>
  )
}