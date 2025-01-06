import { getAllPlans } from "@/api/get-all-plans"
import { Button } from "@/components/button";
import { PlanWidget } from "@/components/plan";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";

export function SignUp() {
  const {
    data: result,
    isFetching: isFetchingPlans,
    isLoading: isLoadingPlans
  } = useQuery({
    queryKey: ['getAllPlans'],
    queryFn: () => getAllPlans()
  })

  return (
    <div className="flex flex-col gap-6 min-w-[402px] items-center">
      <h1 className="text-[28px] font-bold">
        Crie sua conta mail.in
      </h1>

      <div className="w-full ">
        <span className="text-xs font-light text-zinc-600">
          Tipo de plano
        </span>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        {isFetchingPlans && (
          <Loader2Icon className="h-5 w-5 animate-spin text-zinc-400" />
        )}

        {isLoadingPlans && !result && (
          <h1>Plans skeleton</h1>
        )}

        {result && result.plans.map((plan) => {
          return <PlanWidget data={plan} key={plan.id} />
        })}


      </div>
      <Button
        label="Continuar"
        variant="default"
      />

      <div className="w-full h-[1px] bg-zinc-50" />

      <span className="text-[10px] text-center">
        Ao criar a conta, você concorda com nossos <br />
        <strong>Termos de uso</strong> e <strong>Política de Privacidade</strong>
      </span>
    </div>
  )
}