import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/images/Logo.jpg'
import { BiMenu, BiSearch, BiCartAlt } from 'react-icons/bi'
import UserItem from './components/UserItem'

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
  const headerRef = useRef(null)
  const [active, setActive] = useState('header__menu__left')
  // console.log('countHeader::', count++);
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
            <div className='header__menu__item header__menu__right__item'>
              <BiSearch />
            </div>
            <UserItem />
            <div className='header__menu__item header__menu__right__item'>
              <BiCartAlt />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Header)