interface StatusWidgetProps {
  status: "SENT" | "QUEUE" | "DRAFT"
}

export function Status(props: StatusWidgetProps) {
  return (
    <div>
      {
        props.status === 'SENT' ? (
          <div className="bg-teal-950 w-[66px] flex items-center justify-center rounded-xl text-teal-400 text-[10px] font-bold">
            ENVIADO
          </div>
        ) : props.status === 'QUEUE' ? (
          <div className="bg-yellow-950 w-[59px] flex items-center justify-center rounded-xl text-yellow-400 text-[10px] font-bold">
            NA FILA
          </div>
        ) : (
          <div className="bg-red-950 w-[72px] flex items-center justify-center rounded-xl text-red-400 text-[10px] font-bold">
            RASCUNHO
          </div>
        )
      }
    </div>
  )
}