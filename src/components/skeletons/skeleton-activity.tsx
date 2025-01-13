import { Skeleton } from "../ui/skeleton";

export function SkeletonActivity() {
  return (
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
  )
}