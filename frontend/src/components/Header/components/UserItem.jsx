import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCurrentToken,
  selectCurrentUser,
  setCredentials,
  setShowModalStatus
} from '../../../features/auth/auth.slice'
import { useRefreshQuery } from '../../../features/auth/auth.service'
import { BiUser } from 'react-icons/bi'
import { persistor } from '../../../store'
const UserItem = React.memo(() => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)

  const user = useSelector(selectCurrentUser)

  const token = useSelector(selectCurrentToken)

  const { data, isSuccess, isLoading } = useRefreshQuery(undefined, {
    skip: !!token
  })

  const showLoginModal = useCallback(() => {
    dispatch(setShowModalStatus(true))
  }, [dispatch])

  useEffect(() => {
    if (!isLoading) {
      setLoading(false)
      if (isSuccess) {
        dispatch(setCredentials(data))
        persistor.pause()
        persistor.purge()
      }
    }
  }, [isLoading, dispatch, isSuccess, data])

  return loading ? (
    <Fragment></Fragment>
  ) : !token ? (
    <div
      className='header__menu__item header__menu__right__item header__menu__user'
      onClick={showLoginModal}
    >
      <BiUser />
      <span>Tài khoản</span>
    </div>
  ) : (
    <div
      className='header__menu__item header__menu__right__item header__menu__user'
      onClick={() => {}}
    >
      <BiUser />
      <span>{user.userEmail.split('@')[0]}</span>
      {/* <div className='dropdown-menu'>
        <div className='dropdown-menu__item'>
          <div className='dropdown-menu__item__icon'></div>
          <div className='dropdown-menu__item__content'></div>
        </div>
        <div className='dropdown-menu__item'>
          <div className='dropdown-menu__item__icon'></div>
          <div className='dropdown-menu__item__content'></div>
        </div>
        <div className='dropdown-menu__item'>
          <div className='dropdown-menu__item__icon'></div>
          <div className='dropdown-menu__item__content'></div>
        </div>
      </div> */}
    </div>
  )
})

UserItem.displayName = UserItem

export default React.memo(UserItem)
