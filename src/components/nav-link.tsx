import { ComponentProps } from 'react'
import { Link } from 'react-router-dom'

export type NavLinkProps = ComponentProps<typeof Link>

export function NavLink(props: NavLinkProps) {
  return (
    <Link
    className='bg-transparent border border-lime-100 text-zinc-50 py-3 px-8 font-medium text-base rounded-xl'
    {...props}
    >
      {props.children}
    </Link>
  )
}