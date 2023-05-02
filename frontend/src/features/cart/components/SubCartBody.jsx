import React, { Suspense, useCallback } from 'react'
import QuantityInput from '../../../components/QuantityInput'
import PropTypes from 'prop-types'
import { selectCurrentToken } from '../../auth/auth.slice'
import { useDispatch, useSelector } from 'react-redux'
import { numberToCurrency } from '../../../utils'
import { setCartItemQuantity } from '../cart.slice'
const BiTrash = React.lazy(() =>
  import('react-icons/bi').then(({ BiTrash }) => ({ default: BiTrash }))
)

const SubCartBody = (props) => {
  const token = useSelector(selectCurrentToken)
  const dispatch = useDispatch()

  const onQuantityChange = useCallback(
    (index) => (quantity) => {
      if (!token) {
        return dispatch(setCartItemQuantity({ index, quantity }))
      }
    },
    [dispatch]
  )
  return (
    <div className='body-wrapper'>
      <div className='subCart__body'>
        {props.listItem.map((item, index) => (
          <div className='subCart__body__item' key={index}>
            <div className='cart-item cart-item--left'>
              <div className='image-wrap'>
                <img src={item.url} alt={item.title} />
              </div>
            </div>
            <div className='cart-item cart-item--right'>
              <div className='cart-item--right-top'>
                <div className='item__name'> {item.title}</div>
                <div className='item__price'>{numberToCurrency(item.price)}đ</div>
                <div className='size-color__group'>
                  {item.colorName} / {item.sizeName}
                </div>
              </div>
              <Suspense>
                <BiTrash className='btn-delete' />
              </Suspense>
              <div className='cart-item--right-bot'>
                <QuantityInput
                  className='item-quantity'
                  initValue={item.quantity}
                  onChange={onQuantityChange(index)}
                />
                <div className='item__total__price '>
                  Tổng cộng: <span>{numberToCurrency(item.quantity * item.price)}đ</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* <div className='subCart__body__item'>
          <div className='cart-item cart-item--left'>
            <div className='image-wrap'>
              <img
                src='https://res.cloudinary.com/dup598xiv/image/upload/v1681630027/clothesShop/product/tubbq39dphkhlww3zdto.jpg'
                alt='ảnh sản phẩm'
              />
            </div>
          </div>
          <div className='cart-item cart-item--right'>
            <div className='cart-item--right-top'>
              <div className='item__name'> Áo Thun Nữ Cổ Tim Bamboo</div>
              <div className='item__price'>199.000đ</div>
              <div className='size-color__group'>Hồng / Freesize</div>
            </div>
            <Suspense>
              <BiTrash className='btn-delete' />
            </Suspense>
            <div className='cart-item--right-bot'>
              <QuantityInput className='item-quantity' />
              <div className='item__total__price '>
                Tổng cộng: <span>9.650.000đ</span>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

SubCartBody.propTypes = {
  listItem: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default React.memo(SubCartBody)
