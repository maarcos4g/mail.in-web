import { DeleteEmailList } from "@/api/delete-email-list"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"

interface DeleteEmailListBoxProps {
  emailListId: string
  isOwner: boolean
}

const deleteEmailListSchema = z.object({
  emailListId: z.string().uuid()
})

type DeleteEmailListSchema = z.infer<typeof deleteEmailListSchema>

export function DeleteEmailListBox({ emailListId, isOwner }: DeleteEmailListBoxProps) {
  const navigate = useNavigate()

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<DeleteEmailListSchema>({
    resolver: zodResolver(deleteEmailListSchema),
    defaultValues: {
      emailListId
    }
  })

  const { mutateAsync: deleteEmailList } = useMutation({
    mutationFn: DeleteEmailList,
  })

  async function handleDeleteEmailLIst({ emailListId }: DeleteEmailListSchema) {
    try {
      await deleteEmailList({ emailListId })

      toast.success('Lista de e-mail excluida com sucesso!')
      navigate(-1)
    } catch (error: any) {
      const errorMessage =
        error.response?.status === 401
          ? error.response.data.message
          : error.response?.status === 500
            ? 'Ocorreu um erro no servidor'
            : error.response.data.message || 'Ocorreu um erro desconhecido.';

      toast.error(errorMessage);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleDeleteEmailLIst)}>
      <div className="space-y-4 border border-red-400 rounded-xl p-6">
        <div className="space-y-2 border-b border-zinc-800 pb-2">
          <h1 className="text-lg font-bold">Deletar lista</h1>
          <p className="text-sm text-zinc-500">
            A lista de e-mail será excluída permanentemente, incluindo seus remetentes. Esta ação é irreversível e não pode ser desfeita
          </p>
        </div>

        <div className="flex justify-end">
          <button
            className="px-10 py-2 bg-red-500 text-zinc-100 font-medium rounded-lg disabled:bg-zinc-900 disabled:text-zinc-500 disabled:border disabled:border-zinc-800"
            disabled={isSubmitting || !isOwner}
          >
            Excluir
          </button>
        </div>
      </div>
    </form>
  )
}