import { api } from "."
import cookies from 'js-cookie'

export interface GetAllEmailListsParams {
  teamId: string
  pageIndex?: number | null
}

export interface GetAllEmailListsResponse {
  total: number,
  emailLists: {
    id: string
    name: string
    senders: string[]
    ownerId: string
    team: {
      id: string
      name: string
      ownerId: string
      slug: string
    }
    createdAt: Date,
    updatedAt: Date | null
    owner: {
      firstName: string
      avatarUrl: string | null
    }
  }[]
}

export async function GetEmailLists({ teamId, pageIndex }: GetAllEmailListsParams) {
  const token = cookies.get('@token')

  const response = await api.get<GetAllEmailListsResponse>(`/email-list/${teamId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      pageIndex
    }
  })

  return response.data
}