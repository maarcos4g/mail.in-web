export function getCurrentTeamId() {
  const teamId = sessionStorage.getItem('@currentTeamId')
  return { teamId }
}