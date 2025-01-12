import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogHeader
} from "@/components/ui/alert-dialog"
import { AlertDialogProps } from "@radix-ui/react-alert-dialog"
import { AtSign, Plus, X } from "lucide-react"

import { useSender } from "./actions"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

interface AddSendersProps extends AlertDialogProps { }

const addSenderSchema = z.object({
  email: z.string().email({ message: 'Insira um e-mail válido' }),
})

type AddSenderSchema = z.infer<typeof addSenderSchema>

export function AddSenders({ children, ...props }: AddSendersProps) {

  const { getAllSenders, addSender, removeSender } = useSender()

  const senders = getAllSenders()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<AddSenderSchema>({
    resolver: zodResolver(addSenderSchema),
  })

  function handleInsertSenderInList({ email }: AddSenderSchema) {
    addSender(email)
    setValue('email', '')
  }

  return (
    <AlertDialog {...props}>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>

      <AlertDialogContent
        className="bg-zinc-900 border-none shadow shadow-white/10"
      >
        <AlertDialogHeader className="space-y-2">
          <div className="flex items-center justify-between w-full">
            <AlertDialogTitle className="text-lg font-semibold text-white">
              Adicionar remetentes
            </AlertDialogTitle>
            <AlertDialogCancel className="bg-transparent border-none p-0 hover:bg-transparent">
              <X className="size-5 text-zinc-400" />
            </AlertDialogCancel>
          </div>
          <h3 className="text-sm text-zinc-400">Insira os usuários que irão receber e-mails dessa lista</h3>
        </AlertDialogHeader>

        <AlertDialogDescription className="space-y-5">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
            {senders.map((sender, index) => (
              <div
                key={index}
                className="bg-zinc-800 px-4 py-2 rounded-md flex items-center justify-between text-zinc-300"
              >
                <span className="truncate">{sender}</span>
                <button onClick={() => removeSender(sender)}>
                  <X className="text-zinc-400 size-4" onClick={() => removeSender(sender)} />
                </button>
              </div>
            ))}
          </div>

          <div className="w-full h-px bg-zinc-800" />

          <form onSubmit={handleSubmit(handleInsertSenderInList)}>
            <div
              className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 rounded-lg gap-2.5 text-zinc-400 flex items-center data-[disabled=true]:text-zinc-800/80 data-[disabled=true]:cursor-not-allowed"
            >
              <AtSign
              />
              <input
                type="email"
                id="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                placeholder="Digite o e-mail"
                className="w-full bg-transparent focus:outline-none text-zinc-100 disabled:text-zinc-800/80"
                {...register('email')}
              />
              <button type="submit" className="px-5 py-2 bg-lime-300 rounded-lg text-lime-950 font-medium flex gap-2 hover:bg-lime-400">
                Adicionar
                <Plus className="size-5" />
              </button>
            </div>
          </form>
        </AlertDialogDescription>

        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}


      </AlertDialogContent>
    </AlertDialog>
  )
}