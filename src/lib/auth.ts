import { GetProfile } from "@/api/get-profile";
import { useQuery } from "@tanstack/react-query";

export function getAuth() {
  const {
    data: user,
    isLoading: isLoading
  } = useQuery({
    queryKey: ['getProfile'],
    staleTime: 15,
    queryFn: () => GetProfile()
  })

  return { user, isLoading }
}