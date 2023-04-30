import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import { ProductModal } from '../../features/product'
import { LoginSignUpModal } from '../../features/auth'

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
      <ProductModal />
      <LoginSignUpModal />
    </>
  )
}

export default Layout
