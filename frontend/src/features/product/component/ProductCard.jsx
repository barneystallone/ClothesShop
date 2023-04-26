import React, { Suspense, useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
const BiCartAlt = React.lazy(() => import('react-icons/bi').then(({ BiCartAlt }) => ({ default: BiCartAlt })))
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
    if (props.img.length === 1) {
      return setActive(0)
    }
    setActive(null)
  }, [props.img])
  // const styles = {}
  return (
    <div className='product-card'>
      <Link to={`/product/${props.slug}`}>
        {props.sale ? <div className='product-card__tagSale'>-{props.sale}%</div> : null}
        <div className='product-card__image'>
          {props?.colors?.map((color, i) => (
            <img
              key={i}
              src={color.image01}
              loading='lazy'
              alt=''
              className={active === null ? '' : active === i ? 'show' : 'hide'}
            />
          ))}
          {props?.img?.map((item, index) => (
            <img
              key={index}
              src={item.url}
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
          {props.colors?.map((color, i) => (
            <div
              key={i}
              className={`product-card__colors__item ${active === i ? 'active' : ''}`}
              onClick={() => setActive(i * 1)}
            >
              <img src={color.image02} alt='' loading='lazy' />
            </div>
          ))}
          {props.img?.map((item, index) => (
            <div
              key={index}
              className={`product-card__colors__item ${active === index ? 'active' : ''}`}
              onClick={() => setActive(index * 1)}
            >
              <img src={item.thumbUrl} alt='' loading='lazy' />
            </div>
          ))}
        </div>
        <Link to={`/product/${props.slug}`}>
          <h3 className='product-card__name'>
            {props.title.length <= 26 ? props.title : props.title.substring(0, 23).concat('...')}
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
  title: PropTypes.string,
  price: PropTypes.number,
  sale: PropTypes.number,
  slug: PropTypes.string,
  img: PropTypes.arrayOf(PropTypes.object),
  sold: PropTypes.number,
  colors: PropTypes.arrayOf(PropTypes.object)
  // categoryId: PropTypes.string,
  // pId: PropTypes.string,
  // categorySlug: PropTypes.string,
  // description: PropTypes.string,
}

export default React.memo(ProductCard)
