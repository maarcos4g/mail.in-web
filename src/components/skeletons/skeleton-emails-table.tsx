import { Search } from "lucide-react";
import { TableHeaders } from "../email/table-headers";
import { Table } from "../table";
import { TableCell } from "../table/table-cell";
import { TableRow } from "../table/table-row";
import { Skeleton } from "../ui/skeleton";

export function SkeletonTable() {
  return (
    <div className="min-h-full w-full mt-8 flex flex-col gap-8">
      <div className="flex gap-4 items-center">
        <h1 className="text-xl font-bold">E-mails</h1>
        <div className="px-3 w-72 py-1.5 border border-dashed border-zinc-700 rounded-full flex items-center gap-3">
          <Search className="size-4 text-zinc-500" />
          <input
            className="bg-transparent focus:ring-0 flex-1 outline-none border-0 p-0 text-sm"
            placeholder="Buscar..."
          />
        </div>
      </div>

      <Table>

        <TableHeaders />

        <tbody>
          {Array.from({ length: 9 }).map((_, index) => {
            return (
              <TableRow>
                <TableCell>
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-64" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-32" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-64" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-64" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-32" />
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}