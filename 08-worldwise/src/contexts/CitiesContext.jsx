import { useEffect, useState, createContext, useContext } from 'react'

const BASE_URL = 'http://localhost:8000'

const CitiesContext = createContext()

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([])
  const [currentCity, setCurrentCity] = useState({})
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchCities() {
      try {
        setLoading(true)
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()

        setCities(data)
      } catch (err) {
        console.err(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCities()
  }, [])

  async function getCity(id) {
    try {
      setLoading(true)
      const res = await fetch(`${BASE_URL}/cities/${id}`)
      const data = await res.json()

      setCurrentCity(data)
    } catch {
      alert('There was an error loading the city...')
    } finally {
      setLoading(false)
    }
  }

  async function createCity(newCity) {
    try {
      setLoading(true)
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json()

      if (res.ok) setCities((cities) => [...cities, data])
    } catch {
      alert('There was an error creating the city...')
    } finally {
      setLoading(false)
    }
  }

  async function deleteCity(id) {
    try {
      setLoading(true)
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE'
      })

      setCities((cities) => cities.filter((city) => city.id !== id))
    } catch (error) {
      alert('There was an error deleting the city...')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        getCity,
        createCity,
        deleteCity,
        currentCity,
        isLoading
      }}
    >
      {children}
    </CitiesContext.Provider>
  )
}

function useCities() {
  const context = useContext(CitiesContext)
  if (context === undefined)
    throw new Error('CitiesContext was used outside the CitiesProvider')
  return context
}

export { CitiesProvider, useCities }
