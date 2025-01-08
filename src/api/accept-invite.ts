import { api } from "."
import cookies from 'js-cookie'

export interface AcceptInviteRequest {
  inviteId: string
}

export async function AcceptInvite({
  inviteId
}: AcceptInviteRequest) {
  const token = cookies.get('@token')
  await api.post('/accept-invite', { inviteId }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}