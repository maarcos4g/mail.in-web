import { signToken } from "@/lib/auth"
import { api } from "."

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
    signToken(response.data.token)
  })
}