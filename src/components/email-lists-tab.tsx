import { GetEmailLists } from "@/api/get-email-lists"
import { useQuery } from "@tanstack/react-query"

import { getCurrentTeam } from "@/lib/get-current-team"

import { EmailListSkeleton } from "./skeletons/skeleton-email-lists"
import { EmailListOptions } from "./email-list-options"

import { ChevronLeft, ChevronRight, User2 } from "lucide-react"
import { Avatar, AvatarImage } from "./ui/avatar"
import emptyState from '@/assets/empty-state.svg'

import dayjs from 'dayjs'
import { z } from "zod"
import { useNavigate, useSearchParams } from "react-router-dom"

export function EmailListsTab() {
  const { teamId } = getCurrentTeam() || {}
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')


  function handlePaginate(pageIndex: number) {
    setSearchParams((prev) => {
      prev.set('page', (pageIndex + 1).toString())

      return prev
    })
  }

  const {
    data,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['getEmailLists', teamId, pageIndex],
    queryFn: () => GetEmailLists({
      teamId: teamId!,
      pageIndex
    })
  })

  if (isLoading) {
    return <EmailListSkeleton />
  }

  if (isError) {
    return <h1>Erro</h1>
  }

  const total = Math.ceil(data!.total / 6)

  return (
    <div className="flex flex-col gap-4 justify-between min-h-[550px]">
      {data?.emailLists && data.emailLists.length > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-6">
            {data.emailLists.map((emailList) => (
              <button
                onClick={() => {
                  sessionStorage.setItem('@currentEmailList', emailList.name)
                  navigate(`/team/${encodeURIComponent(emailList.team.slug)}/emails/${emailList.id}`)
                }}
                key={emailList.id}
                className="bg-zinc-900 border-2 border-zinc-600 rounded-2xl cursor-pointer"
              >
                <div className="p-5 border-b-2 border-zinc-500">
                  <div className="flex items-start justify-between">
                    <span className="text-zinc-200 font-medium text-lg">{emailList.name}</span>
                    <EmailListOptions ownerId={emailList.ownerId} emailListId={emailList.id} />
                  </div>
                  <div className="w-full flex mt-2">
                    <span className="text-left text-[10px] text-zinc-600 font-semibold">{emailList.senders.length} remetentes adicionados</span>
                  </div>
                </div>

                <div className="w-full bg-zinc-950 px-5 py-4 flex rounded-b-2xl gap-2 items-center">

                  {emailList.owner.avatarUrl ? (
                    <Avatar className='size-4 cursor-pointer'>
                      <AvatarImage
                        src={emailList.owner.avatarUrl}
                        alt={`Avatar do usuário`}
                      />
                    </Avatar>
                  ) : (
                    <div className="border-2 p-1 border-zinc-400 rounded-full">
                      <User2 className="size-3" />
                    </div>
                  )}

                  <span className="text-xs font-semibold text-zinc-500">
                    <span className="text-zinc-200">{emailList.owner.firstName}</span>
                    {' '} criou essa lista de e-mail {' '}
                    <span className="underline">{dayjs(emailList.createdAt).fromNow()}</span>
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex gap-2 min-w-full items-center justify-end mb-2">
            <button
              className="p-[6px] flex items-center justify-center rounded-md border-2 border-zinc-800 disabled:bg-zinc-900 disabled:cursor-not-allowed"
              onClick={() => handlePaginate(pageIndex - 1)}
              disabled={pageIndex === 0}
            >
              <ChevronLeft className="size-4 text-zinc-300" />
            </button>

            <button
              className="p-[6px] flex items-center justify-center rounded-md border-2 border-zinc-800 disabled:bg-zinc-900 disabled:cursor-not-allowed"
              onClick={() => handlePaginate(pageIndex + 1)}
              disabled={pageIndex + 1 >= total}
            >
              <ChevronRight className="size-4 text-zinc-300" />
            </button>
          </div>
        </>
      ) : (
        <div
          className="flex flex-col gap-6 min-w-full min-h-full items-center justify-center"
        >
          <img
            src={emptyState}
            alt=""
            className="w-36 h-36"
          />

          <h1
            className="text-center text-zinc-600"
          >
            O time ainda não tem nenhuma lista <br />
            de e-mail criada. Crie uma e poderá <br />
            visualizar aqui.
          </h1>
        </div>
      )}
    </div>
  )
}