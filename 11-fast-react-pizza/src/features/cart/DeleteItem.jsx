import { useDispatch } from 'react-redux'
import Button from '../../ui/Button'
import { deleteItem } from './cartSlice'

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch()

  return (
    <Button
      onClick={() => dispatch(deleteItem(pizzaId))}
      type="secondary"
      size="xs"
    >
      Delete
    </Button>
  )
}

export default DeleteItem
