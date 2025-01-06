import { api } from "."

export interface RegisterUserRequest {
  planId: string
  name: string
  email: string
}

export async function RegisterUser({
  email,
  name,
  planId
}: RegisterUserRequest) {
  await api.post<RegisterUserRequest>('/user', { email, name, planId })
}