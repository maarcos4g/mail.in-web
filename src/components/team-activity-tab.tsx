import { Activity } from "lucide-react"

export function TeamActivityTab() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-zinc-300 font-bold text-sm">
        Atividade do time
      </h1>

      <div className="flex flex-col gap-8 w-96">
        {Array.from({ length: 7 }).map((activity) => {
          return (
            <div className="flex items-start gap-3">
              <Activity
              className="text-zinc-500"
              />
              <span className="text-sm text-zinc-500 font-normal">
                <span className="text-zinc-100">Marcos Paulo </span> 
                 cadastrou um novo e-mail na lista 
                <span className="text-zinc-100"> Eventos</span>
              </span>
              <p className="text-xs font-normal text-zinc-600 ml-2">há 3 min</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}