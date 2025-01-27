import { GetProfile } from "@/api/get-profile";
import { useQuery } from "@tanstack/react-query";

import cookies from 'js-cookie'

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

export function signToken(token: string) {
  cookies.set('@token', token, {
    expires: 7, //7 days
    path: '/'
  })
}

export function getToken() {
  const token = cookies.get('@token')
  return { token }
}