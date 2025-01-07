import { api } from '.'
import cookies from 'js-cookie'

export interface GetProfileResponse {
  user: {
    id: string
    firstName: string
    fullName: string
    email: string
    avatarUrl: string | null
    plan: {
      id: string
      name: string
    }
    teams: {
      id: string
      name: string
      slug: string
      ownerId: string
    }[]
  }
}

export async function GetProfile() {
  const token = cookies.get('@token')
  const response = await api.get<GetProfileResponse>('/profile', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data.user
}