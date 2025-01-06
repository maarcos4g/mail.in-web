import { api } from "."

export interface ValidateCodeRequest {
  code: string
}

export async function ValidateCode({
  code
}: ValidateCodeRequest) {
  await api.post('/authenticate/code', { code })
}