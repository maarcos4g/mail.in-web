import { GetTeamActivityResponse } from "@/api/get-team-activity";

export function generateActivityLabel(activity: GetTeamActivityResponse['activities'][0]): string {

  const { type, subtype } = activity

  if (type === 'MEMBERSHIP') {
    return 'acabou de aceitar um convite e entrar para o time'
  }

  if (type === 'CREATE') {
    if (subtype === 'EMAILLIST') {
      return 'acabou de criar uma nova lista de e-mail'
    }

    if (subtype === 'EMAIL') {
      return 'cadastrou um novo e-mail'
    }
  }
  return 'realizou uma atividade'
}