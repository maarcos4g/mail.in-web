import { useState } from "react"

export function useSender() {
  const [senders, setSenders] = useState<string[]>(() => getStoredSenders())

  function getStoredSenders(): string[] {
    const stored = sessionStorage.getItem('@senders')
    return stored ? JSON.parse(stored) : []
  }

  function saveInStorage(senders: string[]) {
    sessionStorage.setItem('@senders', JSON.stringify(senders))
  }

  function addSender(sender: string) {
    const senders = getStoredSenders()

    if (!senders.includes(sender)) {
      const updatedSenders = [...senders, sender]
      setSenders(updatedSenders)
      saveInStorage(updatedSenders)
    }
  }

  function removeSender(sender: string) {
    const senders = getStoredSenders()
    const updatedSenders = senders.filter((item) => item !== sender)
    setSenders(updatedSenders)
    saveInStorage(updatedSenders)
  }

  function getAllSenders(): string[] {
    return getStoredSenders()
  }

  return {
    senders,
    addSender,
    removeSender,
    getAllSenders
  }
}