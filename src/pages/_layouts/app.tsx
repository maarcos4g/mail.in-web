import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Header } from '@/components/header'
import { getToken } from '@/lib/auth'

export function AppLayout() {
  const navigate = useNavigate()
  const { token } = getToken()

  useEffect(() => {
    if (!token) {
      navigate('/auth/sign-in', { replace: true })
    }
  }, [token, navigate])

  return (
    <div className='flex flex-col min-h-screen px-10'>
      <Header />

      <div className='flex-1 flex'>
        <Outlet />
      </div>
    </div>
  )
}