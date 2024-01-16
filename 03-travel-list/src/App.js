import { useState } from 'react'

import Logo from './Logo'
import Form from './Form'
import PackingList from './PackingList'
import Stats from './Stats'

export default function App() {
  const [items, setItems] = useState([])

  function handleAddItems(item) {
    setItems((items) => [...items, item])
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id))
  }

  function handleToggleItems(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    )
  }

  function handleClearLists() {
    let confirmed = window.confirm('do you wont to delete all items')
    confirmed && setItems([])
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItems}
        onToggleItems={handleToggleItems}
        onclearLists={handleClearLists}
      />
      <Stats items={items} />
    </div>
  )
}
