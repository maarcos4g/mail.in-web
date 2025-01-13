import { GetTeamActivity } from "@/api/get-team-activity"
import { generateActivityLabel } from "@/lib/generate-team-activity-label"
import { getCurrentTeamId } from "@/lib/get-current-team-id"
import { useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"

import { Activity } from "lucide-react"
import { SkeletonActivity } from "./skeletons/skeleton-activity"

export function TeamActivityTab() {
  const { teamId } = getCurrentTeamId()

  const {
    data: activities,
    isLoading
  } = useQuery({
    queryKey: ['getActivity', teamId],
    queryFn: () => GetTeamActivity({
      teamId: teamId!,
    }),
  })

  if (isLoading) {
    return <SkeletonActivity />
  }

  return (
    <div className="space-y-8">
      <h1 className="text-zinc-300 font-bold text-sm">
        Atividade do time
      </h1>

      <div className="space-y-8 w-[400px]">
        {activities && activities.length > 0 ? activities.map((activity) => {
          return (
            <div className="flex items-start gap-3" key={activity.id}>
              <Activity
                className="text-zinc-500"
              />
              <span className="text-sm text-zinc-500 font-normal">
                <span className="text-zinc-100">{activity.authorName} </span>
                {generateActivityLabel(activity)}
                {activity.subtype != 'EMAILLIST' && (<span className="text-zinc-100"> Eventos</span>)}
              </span>
              <p className="text-xs font-normal text-zinc-600 ml-2">{dayjs(activity.createdAt).fromNow()}</p>
            </div>
          )
        }) : (
          <div className='flex flex-col items-center'>

            <h1
              className="text-center text-zinc-600 text-sm"
            >
              Seu time ainda não tem nenhuma atividade a ser exibida.
            </h1>
          </div>
        )}
      </div>
    </div>
  )
}