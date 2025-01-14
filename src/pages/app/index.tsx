import { SkeletonHome } from "@/components/skeletons/skeleton-home"
import { getAuth } from "@/lib/auth"
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
      sessionStorage.setItem('@currentTeam', JSON.stringify(user.teams[0]))
      navigate(`/team/${encodeURIComponent(user.teams[0].slug)}`)
    }
  }


  return (
    <div
      className="flex flex-col gap-6 min-w-full min-h-full items-center justify-center"
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