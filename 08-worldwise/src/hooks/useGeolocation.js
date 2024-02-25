import { useState } from 'react'

export function useGeolocation() {
  const [isLoading, setIsLoading] = useState(false)
  const [position, setPosition] = useState({
    lat: 40,
    lng: 0
  })
  const [error, setError] = useState(null)

  function getPosition() {
    if (!navigator.geolocation)
      return setError('Your browser does not support geolocation')

    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        })
        setIsLoading(false)
      },
      (error) => {
        if (error.code === 1)
          setError(`${error.message}, pleace allowed your browser permission`)
        // setError(error.message)
        setIsLoading(false)
      }
    )
  }

  return { isLoading, position, error, setError, getPosition }
}
