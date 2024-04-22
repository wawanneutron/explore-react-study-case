import { useSelector } from 'react-redux'
import { formatCurrency } from '../../utils/helpers'
import DeleteItem from './DeleteItem'
import UpdateItemQuantity from './UpdateItemQuantity'
import { getCurrentQuantityById } from './cartSlice'

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item

  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId))

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p>{formatCurrency(totalPrice)}</p>

        <div className="flex gap-3 sm:gap-8">
          <UpdateItemQuantity
            pizzaId={pizzaId}
            currentQuantity={currentQuantity}
          />
          <DeleteItem pizzaId={pizzaId} />
        </div>
      </div>
    </li>
  )
}

export default CartItem
