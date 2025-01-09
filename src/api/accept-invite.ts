import { getToken } from "@/lib/auth"
import { api } from "."

export interface AcceptInviteRequest {
  inviteId: string
}

export async function AcceptInvite({
  inviteId
}: AcceptInviteRequest) {
  const { token } = getToken()
  await api.post('/accept-invite', { inviteId }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}