import { useEffect, useState } from "react"
import { openDB } from "../config/db"

export const useOpenIndexedDB = () => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const initDB = async () => {
      const status = await openDB()
      setIsReady(status)
    }

    initDB()
  }, [])

  return { isReady }
}
