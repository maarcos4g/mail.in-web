import { api } from "."
import cookies from 'js-cookie'

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
    cookies.set('@token', response.data.token, {
      expires: 60 * 60 * 24 * 7, //7 days
      path: '/'
    })
  })
}