import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { HiShoppingCart } from 'react-icons/hi'
import Button from '../../../components/Button'
import { numberToCurrency } from '../../../utils'
import { useDispatch } from 'react-redux'
import { setProductSlug } from '../productModal.slice'
// import { Link } from 'react-router-dom'
const ProductCard = (props) => {
  const [active, setActive] = useState(null)
  const dispatch = useDispatch()

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation()
      e.preventDefault()
      dispatch(setProductSlug(props.slug))
    },
    [props.slug, dispatch]
  )
  // const styles = {}
  return (
    <div className='product-card'>
      <Link to={`/product/${props.slug}`}>
        {props.sale ? <div className='product-card__tagSale'>-{props.sale}%</div> : null}
        <div className='product-card__image'>
          {props.colors?.map((color, i) => (
            <img
              key={i}
              src={color.image01}
              loading='lazy'
              alt=''
              className={active === null ? '' : active === i ? 'show' : 'hide'}
            />
          ))}
          <div className='product-card__btn'>
            {/* <Link to=''> */}
            <Button animate={true} icon={<HiShoppingCart />} onClick={handleClick}>
              Add to cart
            </Button>
            {/* </Link> */}
          </div>
        </div>
      </Link>
      <div className='product-card__info'>
        <div className='product-card__colors'>
          {props.colors?.map((color, i) => (
            <div
              key={i}
              className={`product-card__colors__item ${active === i ? 'active' : ''}`}
              onClick={() => setActive(i * 1)}
            >
              <img src={color.image02} alt='' loading='lazy' />
            </div>
          ))}
        </div>
        <Link to={`/product/${props.slug}`}>
          <h3 className='product-card__name'>{props.title}</h3>

          <div className='product-card__price'>
            {props.sale ? (
              <>
                {numberToCurrency((props.price * (100 - props.sale)) / 100)}
                <span className='product-card__price--old'>
                  <del>{numberToCurrency(props.price)}</del>
                </span>
              </>
            ) : (
              numberToCurrency(props.price)
            )}
          </div>
        </Link>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  title: PropTypes.string,
  price: PropTypes.number,
  sale: PropTypes.number,
  productId: PropTypes.string,
  categorySlug: PropTypes.string,
  slug: PropTypes.string,
  colors: PropTypes.arrayOf(PropTypes.object)
}

export default React.memo(ProductCard)
