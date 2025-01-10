import { CircleX } from "lucide-react"
import { getTeamInvites } from "./actions"

import emptyState from '@/assets/empty-state.svg'
import { PendingInvitesSkeleton } from "./skeletons/pending-invites-skeleton"
import { ConfirmRevokeDialog } from "./confirm-revoke"

export function PendingInvites() {
  const { memberships, isLoading } = getTeamInvites()

  if (isLoading) {
    return <PendingInvitesSkeleton />
  }

  return (
    <div className="space-y-4">
      <h1 className="text-sm font-medium text-zinc-300">Convites pendentes</h1>

      {memberships && memberships.waiting.length > 0 ? (
        <div className="space-y-4">
          {memberships.waiting.map((invite, i) => {
            return (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-zinc-500 font-normal">
                  {invite.memberEmail}
                </span>
                <ConfirmRevokeDialog inviteId={invite.invitationId}>
                  <button
                  // onClick={() => handleRevokeInvite(invite.invitationId)}
                  >
                    <CircleX
                      className="size-6 text-red-500 data-[disabled=true]:text-zinc-700"
                    // data-disabled={revokeLoading}
                    />
                  </button>
                </ConfirmRevokeDialog>
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
            Não há convites pendentes <br /> a serem visualizados.
          </span>
        </div>
      )}
    </div>
  )
}