import { getToken } from "@/lib/auth"
import { api } from "."

export interface DeleteEmailListParams {
  emailListId: string
}

export async function DeleteEmailList({ emailListId }: DeleteEmailListParams) {
  const { token } = getToken()

  const response = await api.delete(`/email-list/${emailListId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data
}