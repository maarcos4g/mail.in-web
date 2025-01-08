import { Skeleton } from "../ui/skeleton";

export function AcceptInviteSkeleton() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Skeleton className="h-64 w-[586px] rounded-xl" />
    </div>
  )
}