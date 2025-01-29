import { TableHeader } from "../table/table-header";

export function TableHeaders() {
  return (
    <thead>
      <tr className="border-b border-white/10">
        <TableHeader>E-mail</TableHeader>
        <TableHeader>Status</TableHeader>
        <TableHeader>Criado há</TableHeader>
        <TableHeader>Enviado há</TableHeader>
        <TableHeader style={{ width: 64 }}>Ações</TableHeader>
      </tr>
    </thead>
  )
}