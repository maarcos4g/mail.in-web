import { Skeleton } from "@/components/ui/skeleton"

export function TeamMembersSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-5">
      {Array.from({ length: 6 }).map((_) => {
        return (
          <Skeleton className="w-40 h-6" />
        )
      })}
    </div>
  )
}