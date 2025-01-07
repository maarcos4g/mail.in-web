import { SkeletonHome } from "@/components/skeleton-home"
import { getAuth } from "@/lib/auth"
import { useNavigate } from "react-router-dom"

export function Home() {

  const { user, isLoading } = getAuth()
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <SkeletonHome />
    )
  }

  if (user) {
    if (user.teams.length > 0) {
      sessionStorage.setItem('@currentTeamId', user.teams[0].id)
      navigate(`/team/${encodeURIComponent(user.teams[0].slug)}`)
    }
  }


  return (
    <div
      className="flex flex-col gap-6 min-w-[402px] items-center"
    >
      <h1>
        Você não faz parte de nenhum time,
        solicite um convite ou crie seu próprio time para começar.</h1>
    </div>
  )
}