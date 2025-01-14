import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "./ui/input"

import { Check, Loader2, UsersRound, X } from "lucide-react"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateTeam } from "@/api/create-team"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

const createTeamSchema = z.object({
  name: z.string(),
})

type CreateTeamSchema = z.infer<typeof createTeamSchema>

export function CreateTeamDialog() {
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<CreateTeamSchema>({
    resolver: zodResolver(createTeamSchema)
  })

  const { mutateAsync: createTeam } = useMutation({
    mutationFn: CreateTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getProfile'],
        exact: true,
        refetchType: 'active'
      })
    }
  })

  async function handleCreateTeam({ name }: CreateTeamSchema) {
    try {
      await createTeam({ name })

      toast.success(`O time ${name} foi criado com sucesso!`)
    } catch (error: any) {
      if (error.response.status === 500) {
        toast.error('Erro interno no servidor ao tentar criar o time.')
      } else {
        toast.error(error.message)
      }

    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div
          className='w-full py-4 flex items-center justify-between text-sm font-semibold text-zinc-200 cursor-pointer'
        >
          Criar novo time
          <UsersRound className='size-4' />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent
        className="bg-zinc-900 border-none shadow shadow-white/10"
      >
        <div className="flex items-center justify-between w-full">
          <AlertDialogTitle className="text-lg font-semibold text-white">
            Novo time
          </AlertDialogTitle>
          <AlertDialogCancel className="bg-transparent border-none p-0 hover:bg-transparent">
            <X className="size-5 text-zinc-400" />
          </AlertDialogCancel>
        </div>

        <AlertDialogDescription>
          <form onSubmit={handleSubmit(handleCreateTeam)} className="flex flex-col gap-5">
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="text" className="text-xs font-light text-zinc-600">
                Nome do time
              </label>
              <Input
                id="text"
                type="text"
                className="w-full"
                required
                {...register('name')}
              />
            </div>

            {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}

            <div className="flex items-center justify-between min-w-full">
              <AlertDialogCancel className="bg-transparent text-zinc-500 border-zinc-800 hover:bg-transparent hover:text-zinc-500">
                Cancelar
              </AlertDialogCancel>

              <div
                className="p-0"
              >
                <button
                  type="submit"
                  className="flex items-center gap-1.5 bg-lime-800 text-zinc-100 text-xs font-medium px-4 py-2  rounded-md disabled:bg-zinc-900 disabled:text-zinc-500 disabled:border disabled:border-zinc-700 hover:bg-lime-900"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" />
                  )
                    : (
                      <>
                        <Check className="size-4" />
                        Salvar
                      </>
                    )}
                </button>
              </div>
            </div>
          </form>
        </AlertDialogDescription>

      </AlertDialogContent>
    </AlertDialog>
  )
}