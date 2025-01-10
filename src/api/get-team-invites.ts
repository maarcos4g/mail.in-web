import { api } from '.'
import { getToken } from '@/lib/auth'

export interface GetTeamInvitesParams {
  slug: string
}

export interface GetTeamInvitesResponse {
  memberships: {
    accepted: {
      memberId: string
      userId: string
      memberName: string
      memberAvatar: string | null
    }[],
    waiting: {
      invitationId: string
      memberEmail: string
    }[]
  }
}

export async function GetTeamInvites({ slug }: GetTeamInvitesParams) {
  const { token } = getToken()
  const response = await api.get<GetTeamInvitesResponse>(`/invites/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data.memberships
}