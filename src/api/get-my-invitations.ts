import { api } from '.'
import cookies from 'js-cookie'

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

export async function GetMyInvitations() {
  const token = cookies.get('@token')
  const response = await api.get<GetInvitationsResponse>('/invites', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data.invites
}