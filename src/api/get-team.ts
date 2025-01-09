import { api } from "."

export interface GetTeamForSlugParams {
  slug: string
}

export interface GetTeamForSlugResponse {
  team: {
		id: string,
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