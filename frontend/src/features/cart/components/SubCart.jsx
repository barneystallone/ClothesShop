import React, { Suspense, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import Button from '../../../components/Button'
const GoLogin = React.lazy(() =>
  import('../../../assets/images/go_login.svg').then(({ ReactComponent }) => ({
    default: ReactComponent
  }))
)
const BiTrash = React.lazy(() =>
  import('react-icons/bi').then(({ BiTrash }) => ({ default: BiTrash }))
)
import { useDispatch, useSelector } from 'react-redux'
import {
  selectTotalCartPrice,
  selectCartStatus,
  selectListCartItem,
  setShowCart
} from '../cart.slice'
import useModal from '../../../hook/useModal'
import SubCartBody from './SubCartBody'
import { numberToCurrency } from '../../../utils'
const SubCart = () => {
  const listCartItem = useSelector(selectListCartItem)
  const totalCartPrice = useSelector(selectTotalCartPrice)
  // console.log(listCartItem)

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
        <div className='subCart-wrap'>
          <div className='subCart'>
            <Suspense>
              <div className='subCart__header'>
                <div className='subCart__header__item login--left'>
                  <div>Đăng nhập</div>
                </div>
                <div className='subCart__header__item login--right'>
                  <div className='content'>
                    Đăng nhập và đồng bộ sản phẩm đến giỏ hàng của bạn
                  </div>
                  <div className='arrow-btn'>
                    <GoLogin />
                  </div>
                </div>
              </div>
              <SubCartBody listItem={listCartItem} />
              <div className='subCart__footer'>
                <div className='subCart__footer__item  total-price-wrap'>
                  Tổng cộng: <span>{numberToCurrency(totalCartPrice)}</span>
                </div>
                <Button className='btn-xemGioHang'>Xem giỏ hàng </Button>
              </div>
            </Suspense>
          </div>
        </div>
      </>
    )
  )
}

SubCart.propTypes = {}

export default React.memo(SubCart)
