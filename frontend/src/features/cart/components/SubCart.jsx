import React, { Suspense, useCallback, useEffect, useState } from 'react'
// import PropTypes from 'prop-types'
import Button from '../../../components/Button'
const GoLogin = React.lazy(() =>
  import('../../../assets/images/go_login.svg').then(({ ReactComponent }) => ({
    default: ReactComponent
  }))
)

import { useDispatch, useSelector } from 'react-redux'
import {
  selectTotalCartPrice,
  selectCartStatus,
  setShowCart,
  setCart,
  selectListCartItem,
  selectItemCount
} from '../cart.slice'
import useModal from '../../../hook/useModal'
import SubCartBody from './SubCartBody'
import { numberToCurrency } from '../../../utils'
import { useGetCartQuery, useSyncCartToDBMutation } from '../cart.service'
import { selectCurrentToken } from '../../auth/auth.slice'
import classNames from 'classnames'
const SubCart = () => {
  const totalCartPrice = useSelector(selectTotalCartPrice)
  const listCartItem = useSelector(selectListCartItem)
  const [isSync, setIsSync] = useState(false)
  const token = useSelector(selectCurrentToken)
  const dispatch = useDispatch()
  const { data: cartData, isSuccess } = useGetCartQuery(undefined, {
    skip: !isSync
  })
  const [syncCart] = useSyncCartToDBMutation()
  const itemCount = useSelector(selectItemCount)
  useEffect(() => {
    if (token) {
      if (listCartItem.length > 0 && !isSync) {
        syncCart(listCartItem)
          .unwrap()
          .finally(() => setIsSync(true))
        return
      }
      setIsSync(true)
    }
  }, [token, listCartItem, syncCart, isSync])

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCart(cartData))
    }
  }, [cartData, dispatch, isSuccess])

  const beforeCloseModalCb = useCallback((e) => {
    e?.target
      .closest('.overlay')
      .nextElementSibling.querySelector('.subCart')
      .classList.add('active')
  }, [])

  const { show: isShowCart, closeModal } = useModal(
    setShowCart,
    selectCartStatus,
    beforeCloseModalCb
  )

  const handleCloseModal = useCallback(
    (e) => {
      e.stopPropagation()
      closeModal(e)
    },
    [closeModal]
  )

  return (
    isShowCart && (
      <>
        <div className='overlay' onClick={handleCloseModal}></div>
        <Suspense>
          <div className='subCart-wrap'>
            <div className='subCart'>
              <div className='subCart__header'>
                <div className='subCart__header__item login--left'>
                  <div>{isSync ? 'Thanh toán' : 'Đăng nhập'}</div>
                </div>
                <div className='subCart__header__item login--right'>
                  <div className='content'>
                    {isSync && itemCount > 0
                      ? `Giỏ hàng hiện đang có ${itemCount} sản phẩm. Thanh toán ngay`
                      : 'Đăng nhập và đồng bộ sản phẩm đến giỏ hàng của bạn'}
                  </div>
                  <div
                    className={classNames('arrow-btn', {
                      login: isSync
                    })}
                  >
                    <GoLogin />
                  </div>
                </div>
              </div>
              <SubCartBody listCartItem={listCartItem} />
              <div className='subCart__footer'>
                <div className='subCart__footer__item  total-price-wrap'>
                  Tổng cộng: <span>{numberToCurrency(totalCartPrice)} VND</span>
                </div>
                <Button className='btn-xemGioHang'>Xem giỏ hàng </Button>
              </div>
            </div>
          </div>
        </Suspense>
      </>
    )
  )
}

SubCart.propTypes = {}

export default React.memo(SubCart)
