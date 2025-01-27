export function getIsEmailListOwner(emailListOwnerId: string, teamOwnerId: string, userId: string): boolean {
  const isOwner = userId === emailListOwnerId || userId === teamOwnerId
  return isOwner
}