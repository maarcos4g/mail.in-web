import { GetTeamInvites } from "@/api/get-team-invites";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function getTeamInvites() {
  const { slug } = useParams()

  const {
    data: memberships,
    isLoading,
  } = useQuery({
    queryKey: ['getTeamInvites'],
    staleTime: 15,
    queryFn: () => GetTeamInvites({ slug: encodeURIComponent(slug!) })
  })

  return { memberships, isLoading }
}