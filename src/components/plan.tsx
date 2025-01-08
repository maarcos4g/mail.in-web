import { GetAllPlansResponse } from "@/api/get-plans"
import { Checkbox } from "./ui/checkbox"

interface PlanWidgetProps {
  data: GetAllPlansResponse['plans'][0]
  onCheckedChange?(checked: boolean): void
}

export function PlanWidget({ data, onCheckedChange }: PlanWidgetProps) {
  return (
    <div className="bg-transparent border border-zinc-700 w-full px-4 py-2 flex items-center justify-between">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">{data.name}</span>
        <p className="text-[10px] text-zinc-500">{data.description}</p>
      </div>

      <Checkbox id={data.id} className="rounded-full" onCheckedChange={onCheckedChange} />
    </div>
  )
}