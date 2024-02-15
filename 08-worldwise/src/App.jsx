import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './Homepage'
import Product from './Product'
import Pricing from './Pricing'
import PageNotFound from './PageNotFound'
import AppLayout from './AppLayout'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/product" element={<Product />}></Route>
        <Route path="/pricing" element={<Pricing />}></Route>
        <Route path="/app" element={<AppLayout />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

/*
#for make function write rfc
*/
