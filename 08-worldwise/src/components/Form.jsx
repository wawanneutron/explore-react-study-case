// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { useEffect, useState } from 'react'
import { useUrlPosition } from '../hooks/useUrlPosition'

import styles from './Form.module.css'
import Button from './Button'
import BackButton from './BackButton'
import Spinner from './Spinner'
import Message from './Message'
import { useCities } from '../contexts/CitiesContext'
import { useNavigate } from 'react-router-dom'

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt())
  return String.fromCodePoint(...codePoints)
}

function Form() {
  const [lat, lng] = useUrlPosition()
  const navigate = useNavigate()

  const [cityName, setCityName] = useState('')
  const [country, setCountry] = useState('')
  const [date, setDate] = useState(new Date())
  const [notes, setNotes] = useState('')
  const [emoji, setEmoji] = useState('')
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
  const [errorGeocoding, setErrorGeocoding] = useState('')
  const { createCity, isLoading } = useCities()

  useEffect(() => {
    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true)
        setErrorGeocoding('')
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        )
        const data = await res.json()
        if (data.status === 402) {
          throw new Error(data.description)
        }

        setCityName(data.city || data.locality || '')
        setCountry(data.countryName)
        setEmoji(convertToEmoji(data.countryCode))
      } catch (error) {
        setErrorGeocoding(error.message)
      } finally {
        setIsLoadingGeocoding(false)
      }
    }

    fetchCityData()
  }, [lat, lng])

  if (isLoadingGeocoding) return <Spinner />

  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />

  if (errorGeocoding) return <Message message={errorGeocoding} />

  async function handleSubmit(e) {
    e.preventDefault()

    if (!cityName || !date || (!lat && !lng)) return

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng }
    }

    await createCity(newCity)
    navigate('/app/cities')
  }

  return (
    <form
      className={`${styles.form} ${isLoading && styles.loading}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
        <div
          style={{ display: 'flex', justifyContent: 'end', fontSize: '14px' }}
        >
          <span>{country}</span>
        </div>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
        {/* <input
          id="date" 
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  )
}

export default Form
