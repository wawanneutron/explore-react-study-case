import { useLoaderData } from 'react-router-dom'
import { getMenu } from '../../services/apiRestaurant'
import MenuItem from './MenuItem'

function Menu() {
  const menu = useLoaderData()
  console.log(menu)

  return (
    <ul>
      {menu.map((item) => (
        <MenuItem pizza={item} key={item.id} />
      ))}
    </ul>
  )
}

export async function Loader() {
  const menu = await getMenu()

  return menu
}

export default Menu
