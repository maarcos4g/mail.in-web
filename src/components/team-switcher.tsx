import { ChevronsUpDown, CircleCheckBig, UsersRound } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

import { GetProfile } from '@/api/get-profile'
import { useQuery } from '@tanstack/react-query'
import { Checkbox } from './ui/checkbox'
import { useNavigate, useParams } from 'react-router-dom'
import { Skeleton } from './ui/skeleton'

export function TeamSwitcher() {
  const { slug } = useParams()
  const teamSlug =
    slug &&
    decodeURIComponent(slug)

  const navigate = useNavigate()

  const {
    data,
    isLoading: isLoadingTeams
  } = useQuery({
    queryKey: ['getProfile'],
    queryFn: () => GetProfile()
  })

  const currentTeam = data && teamSlug
    ? data.teams.find((team) => team.slug === teamSlug)
    : null

  const teams = data
    ? data.teams.filter((team) => team.slug !== teamSlug)
    : []

  return (
    <DropdownMenu>
      {isLoadingTeams ? (
        <>
          <Skeleton className='w-[220px] h-[38px]' />
        </>
      ) : (
        <DropdownMenuTrigger
          className="flex w-[220px] items-center justify-between gap-2 rounded-md py-2 px-4 text-sm font-medium border-2 border-zinc-600 bg-zinc-900 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >

          {currentTeam ? (
            <>
              <span className='text-sm text-zinc-200 font-medium'>
                {currentTeam.name}
              </span>
              {/* <div
              className='bg-zinc-900 border border-green-500 text-green-500 text-[10px] font-semibold py-1 px-2 rounded-2xl'
            >
              {data?.plan.name.toUpperCase()}
            </div> */}
              <ChevronsUpDown className="ml-auto size-4 shrink-0 text-muted-foreground" />
            </>
          ) : (
            <>
              <span className="text-muted-foreground">Selecione o time</span>
              <ChevronsUpDown className="ml-auto size-4 shrink-0 text-muted-foreground" />
            </>
          )
          }
        </DropdownMenuTrigger>
      )}

      <DropdownMenuContent
        align="end"
        alignOffset={currentTeam ? -75 : -16}
        sideOffset={12}
        className='bg-zinc-950 text-zinc-100 border-zinc-600 border-2 px-4 py-2 flex flex-col gap-2 outline-none focus-visible:ring-2 focus-visible:ring-primary'
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            {currentTeam ? (
              <>
                <div className='flex items-center justify-between w-[260px]'>
                  <div
                    className="flex w-[220px] items-center justify-between gap-2 rounded-md py-1 px-4 text-sm font-medium border-2 border-zinc-600 bg-zinc-900 outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <span className='text-sm text-zinc-200 font-medium'>
                      {currentTeam.name}
                    </span>
                    <div
                      className='bg-zinc-900 border border-green-500 text-green-500 text-[10px] font-semibold py-1 px-2 rounded-2xl'
                    >
                      {data?.plan.name.toUpperCase()}
                    </div>
                    <ChevronsUpDown className="ml-auto size-4 shrink-0 text-muted-foreground" />
                  </div>

                  <CircleCheckBig className='size-6 text-sky-400' />
                </div>

                <DropdownMenuSeparator className='bg-zinc-500 mt-4 max-w-[260px]' />
              </>
            ) : (
              <div
                className='text-zinc-500 font-medium text-sm mb-3 w-[260px] flex items-center justify-center text-center'
              >
                Selecione um time disponível
              </div>
            )}

          </DropdownMenuLabel>
          <div className='space-y-2'>
            {teams.length > 0 &&
              teams.map((team) => {
                return (
                  <div
                    key={team.id}
                    className='w-[260px] border border-zinc-600 rounded-md flex items-center justify-between py-2 px-4'
                  >
                    <div className='flex gap-3'>
                      <UsersRound className='text-zinc-500 size-6' />
                      <span className='text-zinc-200 text-sm'>{team.name}</span>
                    </div>

                    <Checkbox
                      className='rounded-full'
                      onCheckedChange={(checked) => {
                        if (checked) {
                          sessionStorage.setItem('@currentTeam', JSON.stringify(team))
                          navigate(`/team/${encodeURIComponent(team.slug)}`)
                        }
                      }}
                    />
                  </div>
                )
              })
            }
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu >
  )
}