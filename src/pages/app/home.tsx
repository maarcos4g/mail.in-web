import { AddNewAction } from "@/components/add-new-action-drop"
import { EmailListsTab } from "@/components/email-lists-tab"
import { TeamActivityTab } from "@/components/team-activity-tab"
import { Search } from "lucide-react"

export function HomeTeam() {
  // const { slug } = useParams()

  return (
    <div className="min-h-full w-full mt-8 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <h1 className="text-xl font-bold">Listas de e-mails</h1>
          <div className="px-3 w-72 py-1.5 border border-dashed border-zinc-700 rounded-full flex items-center gap-3">
            <Search className="size-4 text-zinc-500" />
            <input
              className="bg-transparent focus:ring-0 flex-1 outline-none border-0 p-0 text-sm"
              placeholder="Buscar..."
            // value={search}
            // onChange={onSearchInputChanged}
            />
          </div>
        </div>

        <AddNewAction />
      </div>

      <div className="grid grid-cols-[336px_minmax(900px,_1fr)_100px] gap-[216px]">
        <TeamActivityTab />

        <EmailListsTab />
      </div>
    </div>
  )
}