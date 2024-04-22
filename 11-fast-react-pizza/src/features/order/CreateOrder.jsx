import { Form, redirect, useActionData, useNavigation } from 'react-router-dom'
import { createOrder } from '../../services/apiRestaurant'
import Button from '../../ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice'
import EmptyCart from '../cart/EmptyCart'
import { useState } from 'react'
import store from '../../store'
import { formatCurrency } from '../../utils/helpers'
import { fetchAddress } from '../user/userSlice'

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  )

function CreateOrder() {
  const {
    username,
    address,
    position,
    status: addressStatus,
    error: errorAddress,
  } = useSelector((state) => state.user)
  const isLoadingAddress = addressStatus === 'loading'

  const cart = useSelector(getCart)
  const totalCartPrice = useSelector(getTotalCartPrice)

  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  const formErrors = useActionData()

  const [withPriority, setWithPriority] = useState(false)

  const dispatch = useDispatch()

  if (!cart.length) return <EmptyCart />

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      <Form method="POST">
        <div className="align-center mb-4 flex flex-col gap-1 sm:mb-6 sm:flex-row sm:items-center sm:gap-2">
          <label className="sm:basis-40">Full Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            required
            defaultValue={username}
          />
        </div>

        <div className="align-center mb-4 flex flex-col gap-1 sm:mb-6 sm:flex-row sm:items-center sm:gap-2">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-sm bg-red-100 p-2 text-xs text-red-500">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="align-center relative mb-4 flex flex-col gap-1 sm:mb-6 sm:flex-row sm:items-center sm:gap-2">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
              placeholder="input your address"
              disabled={isLoadingAddress}
              defaultValue={address}
            />

            {addressStatus === 'error' && (
              <p className="mt-2 rounded-sm bg-red-100 p-2 text-xs text-red-500">
                {errorAddress}
              </p>
            )}
          </div>

          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px] top-[47%] z-50 sm:top-[3px]">
              <Button
                disabled={isLoadingAddress}
                type="primary"
                size="xs"
                onClick={(e) => {
                  e.preventDefault()
                  dispatch(fetchAddress())
                }}
              >
                Get Position
              </Button>
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div className="mt-8">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={`${position.latitude}, ${position.longitude}`}
          />

          <Button type="primary" size="md" disabled={isSubmitting}>
            {isSubmitting
              ? 'Placing order...'
              : `Order now ${withPriority ? formatCurrency(totalCartPrice * 2) : formatCurrency(totalCartPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export async function Action({ request }) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  }

  const errors = {}

  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you.'

  if (Object.keys(errors).length > 0) return errors

  // If everything is okey, create new order and redirect
  const newOrder = await createOrder(order)

  // clear cart -> import store for use dispatch
  store.dispatch(clearCart())

  return redirect(`/order/${newOrder.id}`)
}

export default CreateOrder
