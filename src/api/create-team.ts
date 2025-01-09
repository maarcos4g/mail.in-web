import { api } from "."
import cookies from "js-cookie"

export interface CreateTeamRequest {
  name: string
}

export interface CreateTeamResponse {
  teamId: string
}

export async function CreateTeam({
  name
}: CreateTeamRequest) {
  const token = cookies.get('@token')

  await api.post('/team', { name }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}