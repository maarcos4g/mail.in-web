import { getToken } from "@/lib/auth"
import { api } from "."

export interface GetEmailListParams {
  emailListId: string
}

export interface GetEmailListResponse {
  emailList: {
    id: string
    name: string
    senders: string[]
    ownerId: string
    teamId: string
    createdAt: Date
    updatedAt: Date | null
  }
}

export async function GetEmailList({ emailListId }: GetEmailListParams) {
  const { token } = getToken()

  const response = await api.get<GetEmailListResponse>(`/email-lists/${emailListId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data.emailList
}