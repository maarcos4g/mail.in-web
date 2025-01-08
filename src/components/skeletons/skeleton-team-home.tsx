import { Skeleton } from "../ui/skeleton";

export function SkeletonHome() {
  return (
    <div className="flex flex-col min-h-full min-w-full">
      <div className="space-y-6 p-6">

        <div className="grid grid-cols-[336px_minmax(900px,_1fr)_100px] gap-[216px]">
          {/* Atividade do time */}
          <div className="space-y-4">
            <Skeleton className="h-[18px] w-[126px]" /> {/* Subtítulo "Atividade do time" */}
            <div className="space-y-8">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <Skeleton className="h-[42px] w-[336px]" /> {/* Texto da atividade */}
                  {/* <Skeleton className="h-5 w-16" /> */}
                </div>
              ))}
            </div>
          </div>

          {/* Lista de cartões */}
          <div className="grid grid-cols-2 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-[155px] w-[390px]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}