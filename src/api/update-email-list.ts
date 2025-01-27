import { getToken } from "@/lib/auth"
import { api } from "."

export interface UpdateEmailLisRequest {
  emailListId: string
  name: string
  senders: string[]
}

export async function UpdateEmailList({
  name,
  senders,
  emailListId
}: UpdateEmailLisRequest) {
  const { token } = getToken()
  await api.put(`/email-list/${emailListId}`, { name, senders }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}