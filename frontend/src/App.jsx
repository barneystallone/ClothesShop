import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import CheckOut from './pages/CheckOut'
import ListProduct from './pages/ShowProductList'
import NotFound from './pages/NotFound'
import Product from './pages/ProductDetail'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/product'>
            <Route index element={<ListProduct />} />
            <Route path=':slug' element={<Product />} />
          </Route>
          <Route path='/checkout' element={<CheckOut />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
