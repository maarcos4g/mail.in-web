import { useParams } from "react-router-dom"

export function HomeTeam() {
  const { slug } = useParams()

  return (
    <h1>{slug}</h1>
  )
}