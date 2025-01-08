import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

const buttonVariants = {
  default: 'bg-lime-800 text-zinc-100 px-[161px] py-3 font-medium text-base rounded-lg disabled:bg-zinc-900 disabled:text-zinc-500 disabled:border disabled:border-zinc-700 hover:bg-lime-900',
  outline: 'bg-transparent border border-lime-800 text-zinc-100 px-[161px] py-3 font-medium text-base rounded-lg',
  small: 'bg-transparent border border-lime-100 text-zinc-50 py-3 px-8 font-medium text-base rounded-xl',
} as const

type ButtonVariants = keyof typeof buttonVariants

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  variant: ButtonVariants
}

export function Button({ label, variant = 'default', children, className, ...props }: ButtonProps) {
  const classes = clsx(buttonVariants[variant])

  return (
    <button
      className={clsx(classes, className)}
      {...props}
    >
      {children}
      {label}
    </button>
  )
}