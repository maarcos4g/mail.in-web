import { useState } from "react";

import { SignInWithEmail } from "@/api/sign-in";
import { AcceptInvite as AcceptInviteRequest } from "@/api/accept-invite";
import { RegisterUser } from "@/api/register-user";
import { GetPlans } from "@/api/get-plans";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/button";
import { toast } from "sonner";

import { AtSign, Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { GetTeamForSlug } from "@/api/get-team";
import { AcceptInviteSkeleton } from "@/components/skeletons/skeleton-accept-invite";

const acceptInviteSchema = z.object({
  inviteId: z.string().cuid(),
  email: z.string().email(),
  name: z.string().optional(),
  planId: z.string().uuid().optional(),
})

type AcceptInviteSchema = z.infer<typeof acceptInviteSchema>

export function AcceptInvite() {
  const { inviteId, slug } = useParams()
  const [needRegisterUser, setNeedRegisterUser] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting }
  } = useForm<AcceptInviteSchema>({
    resolver: zodResolver(acceptInviteSchema),
    defaultValues: { inviteId }
  })

  const {
    data: result,
  } = useQuery({
    queryKey: ['getAllPlans'],
    queryFn: () => GetPlans()
  })

  const {
    data: team,
    isLoading
  } = useQuery({
    queryKey: ['getTeamForSlug'],
    queryFn: () => GetTeamForSlug({ slug: encodeURIComponent(slug!) })
  })

  const { mutateAsync: signInWithEmail } = useMutation({
    mutationFn: SignInWithEmail
  })

  const { mutateAsync: acceptInvite } = useMutation({
    mutationFn: AcceptInviteRequest
  })

  const { mutateAsync: registerUser } = useMutation({
    mutationFn: RegisterUser
  })

  async function handleAcceptInvite({ inviteId, email, name, planId }: AcceptInviteSchema) {
    try {
      if (needRegisterUser) {
        await registerUser({ email, name: name!, planId: planId! })
      } else {
        await signInWithEmail({ email })
      }

      await acceptInvite({ inviteId })
      toast.success('Convite aceito com sucesso!')
      navigate('/')
    } catch (error: any) {
      if (error.response.status === 401) {
        setNeedRegisterUser(true)
        setDisabled(true)
      }

      toast.error('Erro ao aceitar convite')
    }
  }

  if (isLoading) {
    return <AcceptInviteSkeleton />
  }

  return (
    <form onSubmit={handleSubmit(handleAcceptInvite)}>
      <main
        className="min-w-screen min-h-screen flex items-center justify-center"
      >
        <div className="bg-zinc-900 px-6 py-5 rounded-xl drop-shadow-2xl shadow-zinc-400/50 max-w-[590px] min-h-64 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-lg font-semibold">Convite</h1>
            <p className="text-zinc-400 text-sm">Você foi convidado para contribuir no time <strong>{team?.name}</strong>, para aceitar digite seu e-mail.</p>
          </div>

          <div className="w-full h-px bg-zinc-800" />

          <div
            className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-lg gap-2.5 text-zinc-400 flex items-center data-[disabled=true]:text-zinc-800/80 data-[disabled=true]:cursor-not-allowed"
            data-disabled={needRegisterUser}
          >
            <AtSign
              className="size-5"
            />
            <input
              type="email"
              id="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              placeholder="Digite seu e-mail"
              className="w-full bg-transparent focus:outline-none text-zinc-100 disabled:text-zinc-800/80"
              {...register('email')}
              disabled={needRegisterUser}
              data-disabled={needRegisterUser}
            />
          </div>

          {needRegisterUser && (
            <>
              <p className="text-zinc-400 text-sm">
                Você ainda não tem conta. Insira as informações no formulário abaixo, crie sua conta e poderá contribuir com o time.
              </p>

              <div className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-lg gap-2.5 text-zinc-400 flex items-center">
                <AtSign className="size-5" />
                <input
                  type="text"
                  id="name"
                  autoCorrect="off"
                  placeholder="Digite seu nome"
                  className="w-full bg-transparent focus:outline-none text-zinc-100"
                  {...register('name')}
                />
              </div>

              <div className="grid grid-cols-2 items-center justify-between">
                {result?.plans.map((plan) => {
                  return (
                    <div
                      key={plan.id}
                      className="flex gap-2.5 items-center"
                    >
                      <Checkbox
                        id={plan.id}
                        className="rounded-full border-zinc-500"
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setValue('planId', plan.id)
                            setDisabled(false)
                          }
                        }}
                      />

                      <div>
                        <span className="text-sm font-medium text-zinc-300">{plan.name}</span>
                        <p className="text-xs text-zinc-700">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(plan.priceInCents / 100)}
                        </p>
                      </div>

                    </div>
                  )
                })}
              </div>
            </>
          )}

          <Button
            type="submit"
            label="Aceitar convite"
            variant="default"
            className="flex items-center justify-center gap-2 px-8"
            disabled={isSubmitting || disabled}
          >
            <Plus className="size-4" />
          </Button>

        </div>
      </main>
    </form>
  )
}