import { GetProfileResponse } from "@/api/get-profile"

export function getCurrentTeam() {
  const team = sessionStorage.getItem('@currentTeam')
  if (team) {
    const { id, name, ownerId, slug } = JSON.parse(team) as GetProfileResponse['user']['teams'][0]
    return { teamId: id, name, slug, ownerId }
  }
  return null
}