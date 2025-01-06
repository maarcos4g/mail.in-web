import logo from '@/assets/logo.svg'
import { Button } from '@/components/button'
import { Outlet, useLocation } from 'react-router-dom'

export function AuthLayout() {
  const { pathname } = useLocation()

  return (
    <div className='flex flex-col min-h-screen pt-10'>
      <div className='flex items-center justify-between'>
        <img src={logo} alt="Logo da plataforma" />
        {pathname !== '/auth/sign-in' ? (
          <Button label='Entrar' variant='small' />
        ) : (
          <Button label='Criar Conta' variant='small' />
        )}
      </div>

      <div className='flex-1 flex items-center justify-center'>
        <Outlet />
      </div>
    </div>
  )
} 