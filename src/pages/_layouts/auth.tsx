import logo from '@/assets/logo.svg'
import { NavLink } from '@/components/nav-link'
import { Outlet, useLocation } from 'react-router-dom'

export function AuthLayout() {
  const { pathname } = useLocation()

  return (
    <div className='flex flex-col min-h-screen pt-6 px-10'>
      <div className='flex items-center justify-between'>
        <img src={logo} alt="Logo da plataforma" />
        {pathname !== '/auth/sign-in' ? (
          <NavLink
            to="/auth/sign-in">
            Entrar
          </NavLink>
        ) : (
          <NavLink
            to="/auth/sign-up">
            Criar Conta
          </NavLink>
        )}
      </div>

      <div className='flex-1 flex items-center justify-center'>
        <Outlet />
      </div>
    </div>
  )
} 