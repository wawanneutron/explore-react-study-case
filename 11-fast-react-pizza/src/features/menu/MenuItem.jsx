import { formatCurrency } from '../../utils/helpers'
import Button from '../../ui/Button'

function MenuItem({ pizza }) {
  const { name, unitPrice, ingredients, soldOut, imageUrl } = pizza

  return (
    <li className="flex gap-4 py-2">
      <img
        className={`h-24 rounded md:h-32 ${soldOut && 'opacity-70 grayscale'}`}
        src={imageUrl}
        alt={name}
      />
      <div className="flex grow flex-col pt-0.5 text-sm sm:text-base">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className=" text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          <Button type="primary" size="xs">
            Add to cart
          </Button>
        </div>
      </div>
    </li>
  )
}

export default MenuItem
