import { useMutation } from "@tanstack/react-query"
import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { ValidateCode as ValidateCodeRequest } from "@/api/validate-code"

import { Button } from "@/components/button"
import { PinCode } from "@/components/pin-code"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { useNavigate } from "react-router-dom"

const validateCodeSchema = z.object({
  code: z.string({message: 'Insira o código de 6 dígitos'}).length(6, { message: "O código deve ter exatamente 6 dígitos" }),
});

type ValidateCodeSchema = z.infer<typeof validateCodeSchema>;

export function ValidateCode() {
  const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<ValidateCodeSchema>({
    resolver: zodResolver(validateCodeSchema),
    mode: 'onChange'
  })

  const { mutateAsync: validateCode } = useMutation({
    mutationFn: ValidateCodeRequest
  })

  async function handleValidateCode({ code }: ValidateCodeSchema) {
    try {
      await validateCode({ code })

      toast.success('Sua conta foi confirmada com sucesso!')
      navigate('/')
    } catch (error) {
      toast.error('Erro ao validar código')
    }
  }

  return (
    <div
      className="flex flex-col gap-6 min-w-[402px] items-center"
    >
      <h1 className="text-[28px] font-bold">
        Verifique sua conta
      </h1>

      <span className="text-zinc-600 font-medium text-center">
        Te enviamos um e-mail com um código de <br />
        segurança. Digite abaixo para validar seu acesso.
      </span>

      <form
        className="gap-6 flex flex-col items-center"
        onSubmit={handleSubmit(handleValidateCode)}
      >

        <Controller
          name="code"
          control={control}
          render={({ }) => (
            <PinCode
              length={6}
              onChange={(value) => setValue('code', value, { shouldValidate: true })}
            />
          )}
        />

        {errors.code && <span className="text-red-500 text-xs">{errors.code.message}</span>}


        <Button
          label="Confirmar"
          variant="default"
          type="submit"
          disabled={isSubmitting}
        />
      </form>
    </div>
  )
}