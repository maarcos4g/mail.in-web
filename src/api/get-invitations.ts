import { getToken } from '@/lib/auth'
import { api } from '.'

export interface GetInvitationsResponse {
  invites: {
    id: string
    guestId: string
    guestEmail: string
    inviter: {
      id: string
      firstName: string
    }
    team: {
      id: string
      name: string
      slug: string
    }
  }[]
}

export async function GetInvitations() {
  const { token } = getToken()
  const response = await api.get<GetInvitationsResponse>('/invites', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data.invites
}