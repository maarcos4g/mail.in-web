import { useEffect } from 'react'
import cookies from 'js-cookie'
import { Outlet, useNavigate } from 'react-router-dom'
import { Header } from '@/components/header'

export function AppLayout() {
  const navigate = useNavigate()
  const token = cookies.get('@token')

  useEffect(() => {
    if (!token) {
      navigate('/auth/sign-in', { replace: true })
    }
  }, [token, navigate])

  return (
    <div className='flex flex-col min-h-screen px-10'>
      <Header />

      <div>
        <Outlet />
      </div>
    </div>
  )
}