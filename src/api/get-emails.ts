import { getToken } from '@/lib/auth'
import { api } from '.'

export interface GetEmailsResponse {
  emails: {
    id: string
    subject: string
    content: string
    status: "SENT" | "QUEUE" | "DRAFT"
    emailList: {
      senders: string[]
    },
    createdAt: Date
    sentAt: Date | null
  }[]
}

export interface GetEmailsParams {
  emailListId: string
}

export async function GetEmails({ emailListId }: GetEmailsParams) {
  const { token } = getToken()
  const response = await api.get<GetEmailsResponse>(`/emails/${emailListId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data.emails
}