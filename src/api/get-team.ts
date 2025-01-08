import { api } from "."

export interface GetTeamForSlugParams {
  slug: string
}

export interface GetTeamForSlugResponse {
  team: {
		id: "53183dca-dbfa-48e6-8a86-65e9963e22a3",
		slug: string
		name: string
		ownerId: string
		createdAt: Date
		updatedAt: Date
	}
}

export async function GetTeamForSlug({ slug }: GetTeamForSlugParams) {
  const response = await api.get<GetTeamForSlugResponse>(`/team/${slug}`)

  return response.data.team
}