import { SkeletonHome } from "@/components/skeleton-home"
import { getAuth } from "@/lib/auth"
import { CircleAlert, FileWarning } from "lucide-react"
import { useNavigate } from "react-router-dom"
import emptyState from '@/assets/empty-state.svg'

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
      className="flex flex-col gap-6 min-w-[402px] min-h-full items-center"
    >
      <img
        src={emptyState}
        alt=""
        className="w-36 h-36"
      />

      <h1
      className="text-center text-zinc-600"
      >
        Você não faz parte de nenhum time, <br />
        solicite um convite ou crie seu próprio time <br />
        para começar.
      </h1>
    </div>
  )
}