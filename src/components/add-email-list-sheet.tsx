import { useEffect, useState } from "react"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "./ui/input"
import { Button } from "./button"

import { AtSign, Check, CirclePlus, Plus, UserRoundPlus } from "lucide-react"

import { AddSenders } from "./email-list/add-senders-dialog"
import { useSender } from "./email-list/actions"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { CreateEmailList } from "@/api/create-email-list"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getCurrentTeam } from "@/lib/get-current-team"

const addEmailListSchema = z.object({
  name: z.string({ message: 'Insira o nome da lista' }),
  senders: z.string().array(),
})

type AddEmailListSchema = z.infer<typeof addEmailListSchema>

export function AddEmailListSheet() {

  const { teamId } = getCurrentTeam() || {}
  const { getAllSenders } = useSender()
  const [senders, setSenders] = useState<string[]>([])
  const { invalidateQueries } = useQueryClient()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors }
  } = useForm<AddEmailListSchema>({
    resolver: zodResolver(addEmailListSchema),
    defaultValues: {
      senders,
    }
  })

  const { mutateAsync: createEmailList } = useMutation({
    mutationFn: CreateEmailList,
    onSuccess: () => {
      invalidateQueries({
        queryKey: ['getEmailLists', teamId, 0],
        exact: true,
        refetchType: 'active'
      })
    }
  })

  useEffect(() => {
    const updatedSenders = getAllSenders()
    setSenders(updatedSenders)
    setValue('senders', updatedSenders)
  }, [getAllSenders])

  async function handleCreateEmailList({ name, senders }: AddEmailListSchema) {
    try {
      if (senders.length === 0) {
        toast.error('Insira ao menos um remetente')
        return
      }

      await createEmailList({ name, senders, teamId: teamId! })
      toast.success('Lista de e-mail adicionada com sucesso!')
    } catch (error: any) {
      const errorMessage =
        error.response?.status === 401
          ? error.response.data.message
          : error.response?.status === 500
            ? 'Ocorreu um erro no servidor enquanto criava a lista.'
            : error.response.data.message || 'Ocorreu um erro desconhecido.';

      toast.error(errorMessage);
    }
  }

  return (
    <Sheet
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          sessionStorage.removeItem('@senders')
          setValue('name', '')
        }
      }}
    >
      <SheetTrigger asChild>
        <button
          className='w-full  py-4 flex gap-2 items-center text-sm font-semibold text-zinc-200 border-b-2 border-zinc-600'
        >
          <AtSign className='size-4' />
          Lista de e-mail
        </button>
      </SheetTrigger>

      <SheetContent
        className="bg-zinc-950 flex flex-col gap-8 border-zinc-900"
      >
        <SheetHeader className="gap-3">
          <SheetTitle className="text-zinc-200 font-bold text-lg">
            Criar nova lista
          </SheetTitle>
          <SheetDescription
            className="text-sm text-zinc-500"
          >
            Crie listas de e-mail, personalize e simplifique o envio.
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit(handleCreateEmailList)}
        >
          <div className="overflow-y-auto space-y-8 custom-scroll-hide">
            <div className="w-full">
              <label htmlFor="name" className="text-xs font-light text-zinc-600">
                Nome da lista
              </label>
              <Input
                id="name"
                type="text"
                {...register('name')}
              />
            </div>

            {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}

            <div className="space-y-2.5">
              <h3 className="text-sm text-zinc-200 font-semibold">Remetentes</h3>
              <p className="text-xs text-zinc-600">Cadastre os usuários que irão receber os e-mails da lista</p>
              {senders.length > 0 ? (
                <div className="bg-zinc-900 border border-zinc-600 rounded-md px-4 py-2 mx-9 flex gap-3 items-center justify-between">
                  <UserRoundPlus className="size-4 text-zinc-500" />
                  <span className="text-zinc-100 text-medium text-sm">
                    {senders.length}{" "}
                    {senders.length > 1 ? "e-mails adicionados" : "e-mail adicionado"}
                  </span>
                  <AddSenders>
                    <button>
                      <CirclePlus className="size-5 text-lime-800" />
                    </button>
                  </AddSenders>
                </div>
              ) : (
                <AddSenders>
                  <button
                    type="button"
                    className="bg-lime-800 text-zinc-100 flex w-full px-28 py-3 gap-2.5 items-center justify-center font-medium text-base rounded-lg disabled:bg-zinc-900 disabled:text-zinc-500 disabled:border disabled:border-zinc-700 hover:bg-lime-900"
                  >
                    <Plus className="size-4" />
                    Adicionar
                  </button>
                </AddSenders>
              )}
            </div>
          </div>


          <SheetFooter className="mt-6">
            <SheetClose
              className="border border-zinc-800 text-zinc-500 text-xs font-medium px-2.5 py-1 rounded-md"
            >
              Cancelar
            </SheetClose>

            <button
              type="submit"
              className="flex items-center gap-1.5 bg-lime-800 text-zinc-200 text-xs font-medium px-4 py-2  rounded-md disabled:bg-zinc-900 disabled:text-zinc-500 disabled:border disabled:border-zinc-800"
              disabled={isSubmitting}
            >
              <Check className="size-4" />
              Salvar
            </button>
          </SheetFooter>
        </form>

      </SheetContent >

    </Sheet >
  )
}