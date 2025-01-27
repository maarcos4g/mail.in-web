import { useEffect, useState } from "react"

import { CirclePlus, UserMinus } from "lucide-react"
import { Input } from "../ui/input"

import { GetEmailListResponse } from "@/api/get-email-list"
import { useMutation } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { UpdateEmailList } from "@/api/update-email-list"
import { toast } from "sonner"
import { AddSenderInput } from "./add-sender-input"

interface GeneralConfigBoxProps {
  emailList: GetEmailListResponse['emailList']
  isOwner: boolean
}

const updateEmailListSchema = z.object({
  name: z.string(),
  senders: z.string().array()
})

type UpdateEmailListSchema = z.infer<typeof updateEmailListSchema>

export function GeneralConfigBox({ emailList, isOwner }: GeneralConfigBoxProps) {
  const [senders, setSenders] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<UpdateEmailListSchema>({
    resolver: zodResolver(updateEmailListSchema),
    defaultValues: {
      name: emailList.name,
      senders: emailList.senders || [],
    }
  })

  const { mutateAsync: updateEmailList } = useMutation({
    mutationFn: UpdateEmailList,
  })

  function handleRemoveSender(senderToRemove: string) {
    setSenders((prev) => prev.filter(sender => sender !== senderToRemove))
  }

  async function handleUpdateEmailList({ name, senders }: UpdateEmailListSchema) {
    try {
      await updateEmailList({ name, senders, emailListId: emailList.id })

      toast.success('Alterações salvas com sucesso!')
    } catch (error: any) {
      const errorMessage =
        error.response?.status === 401
          ? error.response.data.message
          : error.response?.status === 500
            ? 'Ocorreu um erro no servidor durante a alteração dos dados.'
            : error.response.data.message || 'Ocorreu um erro desconhecido.';

      toast.error(errorMessage);
    }
  }

  useEffect(() => {
    if (emailList.senders) {
      setSenders(emailList.senders)
    }
  }, [emailList.senders])

  return (
    <form onSubmit={handleSubmit(handleUpdateEmailList)}>
      <div className="space-y-2 border border-zinc-800 rounded-xl p-6">
        <h1 className="font-bold text-lg">Configurações gerais</h1>
        <p className="text-sm text-zinc-500">Altere as informações gerais da lista de e-mail</p>
        <div className="w-full">
          <label htmlFor="name" className="font-light text-zinc-600">
            Nome da lista
          </label>
          <Input
            id="name"
            type="text"
            autoCorrect="off"
            {...register('name')}
            disabled={!isOwner}
          />
        </div>

        <div className="flex w-full items-center justify-between pt-2">
          <h1>Remetentes</h1>
          <div className="flex gap-6">
            <Input
              id="email"
              type="email"
              autoCorrect="off"
              autoComplete="email"
              autoCapitalize="none"
              className="w-80"
              // {...register("email")}
            />
            <button type="submit">
              <CirclePlus />
            </button>
          </div>
        </div>

        <div className="space-y-4 pt-6 border border-zinc-800 rounded-xl p-2">
          {senders.map((sender, index) => {
            return (
              <div
                key={`${sender}-${index}`}
                className="flex items-center justify-between border-b border-zinc-800 pb-4"
              >
                <span className="text-sm font-medium text-zinc-500">{sender}</span>
                <button
                  className="bg-red-500 px-5 py-2 flex items-center gap-2.5 rounded-md"
                  onClick={() => handleRemoveSender(sender)}
                >
                  <UserMinus className="size-4" />
                  <span className="text-sm font-bold">Remover</span>
                </button>
              </div>
            )
          })}
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-10 py-2 bg-zinc-100 text-zinc-900 font-medium rounded-lg"
            disabled={isSubmitting || !isOwner}
          >
            Salvar
          </button>
        </div>

      </div>
    </form>
  )
}