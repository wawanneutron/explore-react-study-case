import { Outlet, useNavigation } from 'react-router-dom'
import CartOverview from '../features/cart/CartOverview'
import Header from './Header'
import Loader from './Loader'
import { useSelector } from 'react-redux'
import { getCart } from '../features/cart/cartSlice'

function AppLayout() {
  const cart = useSelector(getCart)
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />

      <div className="my-10 overflow-auto">
        <main className="mx-auto max-w-3xl ">
          <Outlet />
        </main>
      </div>

      {cart.length ? <CartOverview /> : null}
    </div>
  )
}

export default AppLayout
