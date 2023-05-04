import React, { Suspense } from 'react'
import QuantityInput from '../../../components/QuantityInput'
import { selectCurrentToken } from '../../auth/auth.slice'
import { useDispatch, useSelector } from 'react-redux'
import { numberToCurrency } from '../../../utils'
import { selectListCartItem, setCartItemQuantity } from '../cart.slice'
const BiTrash = React.lazy(() =>
  import('react-icons/bi').then(({ BiTrash }) => ({ default: BiTrash }))
)

const SubCartBody = (props) => {
  const token = useSelector(selectCurrentToken)
  const listCartItem = useSelector(selectListCartItem)
  const dispatch = useDispatch()

  const onQuantityInputChange = (index) => (quantity) => {
    dispatch(setCartItemQuantity({ index, quantity: quantity * 1 }))
    if (!token) {
      return
    }
  }

  return (
    <div className='body-wrapper'>
      <div className='subCart__body'>
        {listCartItem.map((item, index) => (
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
                  quantity={item.quantity}
                  onChange={onQuantityInputChange(index)}
                  // onClick={onQuantityInputChange(index)}
                />
                <div className='item__total__price '>
                  Tổng cộng: <span>{numberToCurrency(item.quantity * item.price)}đ</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default React.memo(SubCartBody)
