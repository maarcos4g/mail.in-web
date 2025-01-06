import { api } from "."

export interface SendAuthCodeRequest {
  email: string
}

export async function RequestAuthCode({
  email
}: SendAuthCodeRequest) {
  await api.post('/authenticate', { email })
}