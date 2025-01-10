import { getToken } from "@/lib/auth"
import { api } from "."

export interface CreateInviteRequest {
  guestEmail: string
  teamId: string
}

export interface CreateInviteResponse {
  inviteId: string
}

export async function CreateInvite({
  guestEmail,
  teamId
}: CreateInviteRequest) {
  const { token } = getToken()

  await api.post('/invite', { guestEmail, teamId }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}