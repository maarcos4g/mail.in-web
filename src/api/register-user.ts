import { api } from "."
import cookies from 'js-cookie'

export interface RegisterUserRequest {
  planId: string
  name: string
  email: string
}

export interface RegisterUserResponse {
  token: string
}

export async function RegisterUser({
  email,
  name,
  planId
}: RegisterUserRequest) {
  await api.post<RegisterUserResponse>('/user', { email, name, planId })
  .then(response => {
    cookies.set('@token', response.data.token, {
      expires: 60 * 60 * 24 * 7, //7 days
      path: '/'
    })
  })
}