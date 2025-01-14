import React, { useCallback, useEffect, useRef, useState, Suspense } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/images/Logo.jpg'
import { BiMenu, BiSearch, BiCartAlt } from 'react-icons/bi'
import UserItem from './components/UserItem'
// const { SubCart } = React.lazy(() => import('../../features/cart'))
import { SubCart } from '../../features/cart'
import { useDispatch, useSelector } from 'react-redux'
import { selectTotalItemQuantity, setShowCart } from '../../features/cart/cart.slice'
import { setShowSearchModalStatus } from '../../features/product/product.slice'
const leftNav = [
  {
    content: 'Trang chủ',
    path: '/'
  },
  {
    content: 'Sản phẩm',
    path: '/product'
  },
  {
    content: 'About us',
    path: '/about'
  },
  {
    content: 'Liên hệ',
    path: '/contact'
  }
]

let count = 1
const Header = () => {
  const { pathname } = useLocation()
  const activeNav = leftNav.findIndex((e) => e.path === pathname)
  const [active, setActive] = useState('header__menu__left')
  const headerRef = useRef(null)
  const dispatch = useDispatch()
  const totalProductCount = useSelector(selectTotalItemQuantity)

  const toggleMenu = () => {
    setActive((prev) => {
      return prev === 'header__menu__left'
        ? 'header__menu__left show'
        : 'header__menu__left'
    })
  }

  const closeMenu = useCallback(() => {
    setActive('header__menu__left')
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (document.documentElement.scrollTop > 20) {
        headerRef.current.classList.add('shrink')
      } else {
        headerRef.current.classList.remove('shrink')
      }
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className='header' ref={headerRef}>
      <div className='container'>
        <div className='header__logo'>
          <Link to='/'>
            <img src={logo} alt='' />
          </Link>
        </div>
        <div className='header__menu'>
          <div className={active}>
            {leftNav.map((item, index) => (
              <div
                key={index}
                className={`header__menu__item header__menu__left__item ${
                  index === activeNav ? 'active' : ''
                }`}
                onClick={closeMenu}
              >
                <Link to={item.path}>
                  <span>{item.content}</span>
                </Link>
              </div>
            ))}
          </div>
          <div className='header__menu__mobile-toggle' onClick={toggleMenu}>
            <BiMenu />
          </div>
          <div className='header__menu__right '>
            <div
              className='header__menu__item header__menu__right__item'
              onClick={() => dispatch(setShowSearchModalStatus(true))}
            >
              <BiSearch />
            </div>
            <div
              className='header__menu__item header__menu__right__item cart-wrap'
              onClick={() => dispatch(setShowCart(true))}
            >
              <BiCartAlt />
              {totalProductCount >= 0 && (
                <span className='count__item'>
                  {totalProductCount > 99 ? '99+' : totalProductCount}
                </span>
              )}
              <SubCart />
            </div>
            <UserItem />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
