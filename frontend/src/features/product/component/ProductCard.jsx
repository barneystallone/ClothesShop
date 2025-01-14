import React, { Suspense, useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
const BiCartAlt = React.lazy(() =>
  import('react-icons/bi').then(({ BiCartAlt }) => ({ default: BiCartAlt }))
)
import Button from '../../../components/Button'
import { numberToCurrency } from '../../../utils'
import { useDispatch } from 'react-redux'
import { setProductModalSlug } from '../product.slice'

// import { Link } from 'react-router-dom'
const ProductCard = (props) => {
  const [active, setActive] = useState(null)
  const dispatch = useDispatch()
  const handleClick = useCallback(
    (e) => {
      e.stopPropagation()
      e.preventDefault()
      dispatch(setProductModalSlug(props.slug))
    },
    [props.slug, dispatch]
  )
  useEffect(() => {
    if (props.url.length === 1) {
      return setActive(0)
    }
    setActive(null)
  }, [props.url])
  // const styles = {}
  return (
    <div className='product-card'>
      <Link to={`/product/${props.slug}`}>
        {props.sale ? <div className='product-card__tagSale'>-{props.sale}%</div> : null}
        <div className='product-card__image'>
          {props?.url?.map((item, index) => (
            <img
              key={index}
              src={item}
              loading='lazy'
              alt=''
              className={active === null ? '' : active === index ? 'show' : 'hide'}
            />
          ))}
          <div className='product-card__btn'>
            {/* <Link to=''> */}
            <Button
              animate={true}
              icon={
                <Suspense fallback={<div>...</div>}>
                  <BiCartAlt />
                </Suspense>
              }
              onClick={handleClick}
            >
              Add to cart
            </Button>
            {/* </Link> */}
          </div>
        </div>
      </Link>
      <div className='product-card__info'>
        <div className='product-card__colors'>
          {props.thumbUrl?.map((item, index) => (
            <div
              key={index}
              className={`product-card__colors__item ${active === index ? 'active' : ''}`}
              onClick={() => setActive(index * 1)}
            >
              <img src={item} alt='' loading='lazy' />
            </div>
          ))}
        </div>
        <Link to={`/product/${props.slug}`}>
          <h3 className='product-card__name'>
            {props.title.length <= 26
              ? props.title
              : props.title.substring(0, 23).concat('...')}
          </h3>

          <div className='product-card__price'>
            {props.sale ? (
              <>
                {numberToCurrency((props.price * (100 - props.sale)) / 100)}đ
                <span className='product-card__price--old'>
                  <del>{numberToCurrency(props.price)}đ</del>
                </span>
              </>
            ) : (
              <>{numberToCurrency(props.price)}đ</>
            )}
          </div>
        </Link>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  pId: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  description: PropTypes.string,
  price: PropTypes.number.isRequired,
  sold: PropTypes.number,
  url: PropTypes.arrayOf(PropTypes.string).isRequired,
  thumbUrl: PropTypes.arrayOf(PropTypes.string).isRequired,
  sale: PropTypes.number
  // categoryId: PropTypes.string,
  // pId: PropTypes.string,
  // categorySlug: PropTypes.string,
  // description: PropTypes.string,
}

export default React.memo(ProductCard)
