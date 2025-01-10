import { truncateString } from "@/lib/truncate-string"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { CircleCheckBig } from "lucide-react"
import { getTeamInvites } from "./actions"
import { getInitials } from "@/lib/get-name-initials"
import emptyState from '@/assets/empty-state.svg'
import { TeamMembersSkeleton } from "./skeletons/team-members-skeleton"

export function TeamMembers() {
  const { memberships, isLoading } = getTeamInvites()

  if (isLoading) {
    return <TeamMembersSkeleton />
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-sm font-medium text-zinc-300">Quem aceitou</h1>
        <p className="text-sm font-medium text-zinc-600">Visualize os membros que aceitaram o convite</p>
      </div>

      {memberships && memberships.accepted.length != 0 ? (
        <div className="grid grid-cols-2 gap-5">
          {memberships && memberships.accepted.map((member, _) => {
            return (
              <div
                key={member.memberId}
                className="flex gap-2.5 text-zinc-300"
              >
                <CircleCheckBig className="text-green-300 size-6" />
                <Avatar className="size-6">
                  {member.memberAvatar ? (
                    <AvatarImage
                      src={member.memberAvatar}
                    />
                  ) : (
                    <AvatarFallback className="p-1 text-xs">
                      {getInitials(member.memberName)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <span className="text-sm font-medium text-zinc-300">{truncateString(member.memberName, 10)}</span>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="space-y-4 w-full flex flex-col items-center justify-center">
          <img
            src={emptyState}
            className="size-40"
          />

          <span className="text-sm text-zinc-400 text-center">
            Não há convites aceitos <br /> para serem visualizados.
          </span>
        </div>
      )}

    </div>
  )
}