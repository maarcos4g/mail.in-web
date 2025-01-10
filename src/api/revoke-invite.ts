import { getToken } from "@/lib/auth"
import { api } from "."

export interface RevokeInviteRequest {
  inviteId: string
}

export async function RevokeInvite({
  inviteId
}: RevokeInviteRequest) {
  const { token } = getToken()
  await api.delete(`/revoke/${inviteId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}