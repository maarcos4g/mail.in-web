import { api } from "."

export interface GetAllPlansResponse {
  plans: {
    id: string
    name: string
    description: string
    priceInCents: number
  }[]
}

export async function GetAllPlans() {
  const response = await api.get<GetAllPlansResponse>('/plans')

  return response.data
}