import { getToken } from "@/lib/auth"
import { api } from "."

export interface GetTeamActicityParams {
  teamId: string
}

export interface GetTeamActivityResponse {
  activities: {
    id: string
    type: 'MEMBERSHIP' | 'CREATE',
    subtype: 'EMAIL' | 'EMAILLIST' | null
    authorName: string
    authorId: string
    teamId: string
    createdAt: Date
  }[]
}

export async function GetTeamActivity({ teamId }: GetTeamActicityParams) {
  const { token } = getToken()

  const response = await api.get<GetTeamActivityResponse>(`/activity/${teamId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data.activities
}