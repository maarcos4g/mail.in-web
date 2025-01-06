import { useEffect } from 'react'
import cookies from 'js-cookie'
import { Outlet, useNavigate } from 'react-router-dom'

export function AppLayout() {
  const navigate = useNavigate()
  const token = cookies.get('@token')

  useEffect(() => {
    if (!token) {
      navigate('/auth/sign-in', { replace: true })
    }
  }, [token, navigate])

  return (
    <div>
      AppLayout
      <Outlet />
      </div>
  )
}