import { useState, useEffect } from 'react'

export function useLocalStorageState(key) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key)
    return JSON.parse(storedValue)
  })
  

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])


  if (!value) setValue([])


  return [value, setValue]
}
