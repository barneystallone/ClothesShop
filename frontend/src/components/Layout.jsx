import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ProductViewModal from './ProductViewModal'
import LoginSignUpModal from './LoginSignUpModal'
const Layout = () => {
  return (
    <>
      <Header />
      <div className='container'>
        <div className='main'>
          <Outlet />
        </div>
      </div>
      <Footer />
      <ProductViewModal />
      <LoginSignUpModal />
    </>
  )
}

export default Layout
