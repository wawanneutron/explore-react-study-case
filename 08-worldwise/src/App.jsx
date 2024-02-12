import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './Homepage'
import Product from './Product'
import Pricing from './Pricing'
import PageNotFound from './PageNotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/product" element={<Product />}></Route>
        <Route path="/pricing" element={<Pricing />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

/*
#untuk membuat function ketik rfc
*/
