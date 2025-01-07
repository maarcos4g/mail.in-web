import { RequestAuthCode } from "@/api/request-authentication-code";
import { SignInWithEmail } from "@/api/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/button";
import { Input } from "@/components/ui/input";

import { useNavigate } from "react-router-dom";

const signInSchema = z.object({
  email: z.string().email(),
})

type SignInSchema = z.infer<typeof signInSchema>

export function SignIn() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting }
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema)
  })

  const { mutateAsync: signInWithEmail } = useMutation({
    mutationFn: SignInWithEmail
  })

  const { mutateAsync: requestAuthCode } = useMutation({
    mutationFn: RequestAuthCode
  })

  async function handleAuthenticate({ email }: SignInSchema) {
    try {
      await requestAuthCode({ email })
      await signInWithEmail({ email })

      toast.success('Login efetuado com sucesso!')
      navigate('/auth/code')
    } catch (error) {
      toast.error('Erro ao entrar na conta!')
    }
  }

  return (
    <form
      className="flex flex-col gap-6 min-w-[402px] items-center"
      onSubmit={handleSubmit(handleAuthenticate)}
    >
      <h1 className="text-[28px] font-bold">
        Entre no mail.in
      </h1>

      <div className="w-full">
        <label htmlFor="email" className="text-xs font-light text-zinc-600">
          Seu e-mail
        </label>
        <Input
          id="email"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          {...register('email')}
        />
      </div>

      <Button
        label="Continuar"
        variant="default"
        type="submit"
        disabled={isSubmitting || !watch('email')}
      />
    </form>
  )
}