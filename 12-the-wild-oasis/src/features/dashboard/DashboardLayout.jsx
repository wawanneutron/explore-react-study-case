import styled from 'styled-components'
import { useRecentBookings } from './useRecentBookings'
import { useRecentStays } from './useRecentStays'
import { useCabins } from '../cabins/useCabins'
import Spinner from '../../ui/Spinner'
import Stats from './Stats'
import SalesChart from './SalesChart'
import DurationChart from './DurationChart'

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`

function DashboardLayout() {
  const { bookings, isLoading: isLoadingBooking } = useRecentBookings()
  const {
    stays,
    confirmedStays,
    isLoading: isLoadingStay,
    numDays,
  } = useRecentStays()
  const { cabins, isLoading: isLoadingCabin } = useCabins()

  if (isLoadingBooking || isLoadingStay || isLoadingCabin) return <Spinner />

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <div>Statistics</div>
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
