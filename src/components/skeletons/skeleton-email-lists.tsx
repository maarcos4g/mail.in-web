import { Skeleton } from "../ui/skeleton";

export function EmailListSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-[155px] w-[390px]" />
      ))}
    </div>
  )
}