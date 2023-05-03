import React, { Fragment, Suspense } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import CheckOut from './pages/CheckOut'
import ListProduct from './pages/ShowProductList'
import NotFound from './pages/NotFound'
import Product from './pages/ProductDetail'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  return (
    <Fragment>
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

      <ToastContainer />
    </Fragment>
  )
}
export default App
