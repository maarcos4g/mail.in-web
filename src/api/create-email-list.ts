import { getToken } from "@/lib/auth"
import { api } from "."

export interface CreateEmailLisRequest {
  teamId: string
  name: string
  senders: string[]
}

export interface CreateEmailListResponse {
  emailListId: string
}

export async function CreateEmailList({
  name,
  senders,
  teamId
}: CreateEmailLisRequest) {
  const { token } = getToken()
  await api.post<CreateEmailListResponse>('/email-list', { name, senders, teamId }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}