import { api } from "."

export interface GetAllPlansResponse {
  plans: {
    id: string
    name: string
    description: string
    priceInCents: number
  }[]
}

export async function GetPlans() {
  const response = await api.get<GetAllPlansResponse>('/plans')

  return response.data
}