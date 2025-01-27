import { Skeleton } from "@/components/ui/skeleton"

export function PendingInvitesSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 6 }).map((_) => {
        return (
          <Skeleton className="w-full h-6" />
        )
      })}
    </div>
  )
}