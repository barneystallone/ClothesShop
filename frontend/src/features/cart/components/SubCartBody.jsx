import React, { Suspense, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import QuantityInput from '../../../components/QuantityInput'
import { selectCurrentToken } from '../../auth/auth.slice'
import { useDispatch, useSelector } from 'react-redux'
import { numberToCurrency } from '../../../utils'
import { selectListCartItem, setCartItemQuantity } from '../cart.slice'
import { setProductModalSlug } from '../../product/product.slice'
import { usePutItemQuantityMutation } from '../cart.service'
import { Link } from 'react-router-dom'
const BiTrash = React.lazy(() =>
  import('react-icons/bi').then(({ BiTrash }) => ({ default: BiTrash }))
)

let count = 1

const SubCartBody = (props) => {
  const token = useSelector(selectCurrentToken)
  const { listCartItem } = props
  const dispatch = useDispatch()
  const [putQuantity] = usePutItemQuantityMutation()

  const onQuantityInputChange = useCallback(
    (index) => (quantity) => {
      dispatch(setCartItemQuantity({ index, quantity: quantity * 1 }))
    },
    [dispatch]
  )
  const onQuantityChangeSync = useCallback(
    (index, sizeId, itemId) => (quantity) => {
      putQuantity({ index, quantity: quantity * 1, sizeId, itemId })
    },
    [putQuantity]
  )

  const handleClick = useCallback(
    (slug, sizeId, itemId, quantity, index) => (e) => {
      e.stopPropagation()
      e.preventDefault()
      dispatch(
        setProductModalSlug({
          slug,
          initialItem: {
            sizeId,
            itemId,
            quantity,
            index // Thứ tự trong cart
          }
        })
      )
    },
    [dispatch]
  )

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
                <Link to={`/product/${item.slug}`}>
                  <div className='item__name'>
                    {' '}
                    {item.title.length > 36
                      ? item.title.substring(0, 33).concat('...')
                      : item.title}
                  </div>
                </Link>
                <div className='item__price'>{numberToCurrency(item.price)}đ</div>
                <div
                  className='size-color__group'
                  onClick={handleClick(
                    item.slug,
                    item.sizeId,
                    item.itemId,
                    item.quantity,
                    index
                  )}
                >
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
                  onChangeSyncDb={
                    token ? onQuantityChangeSync(index, item.sizeId, item.itemId) : null
                  }
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
SubCartBody.propTypes = {
  listCartItem: PropTypes.arrayOf(PropTypes.object).isRequired
}
export default React.memo(SubCartBody)
