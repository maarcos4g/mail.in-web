import { getToken } from "@/lib/auth"
import { api } from "."

export interface CreateTeamRequest {
  name: string
}

export interface CreateTeamResponse {
  teamId: string
}

export async function CreateTeam({
  name
}: CreateTeamRequest) {
  const { token } = getToken()

  await api.post('/team', { name }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}