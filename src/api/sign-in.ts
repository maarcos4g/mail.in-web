import { signToken } from "@/lib/auth"
import { api } from "."

export interface SignInRequest {
  email: string
}

export interface SignInResponse {
  token: string
}

export async function SignInWithEmail({
  email,
}: SignInRequest) {
  await api.post<SignInResponse>('/sign-in', { email })
  .then(response => {
    signToken(response.data.token)
  })
}