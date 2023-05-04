import React, {
  Fragment,
  useCallback,
  useMemo,
  useState,
  Suspense,
  useRef,
  useEffect
} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { numberToCurrency } from '../../../utils'
// import sizes from '../../../assets/fake-data/product-size'

import QuantityInput from '../../../components/QuantityInput'
import CustomSelect from '../../../components/CustomSelect'
const ProductImagesSlider = React.lazy(() => import('./ProductImageSlider'))
// import ProductImagesSlider from './ProductImageSlider'
import Button from '../../../components/Button'
import ProductViewSkeleton from './ProductViewSkeleton'

import { handleLazyLoadSvgPromise } from '../../../utils'
import { useDispatch } from 'react-redux'
import { putCartItem } from '../../cart/cart.slice'

const BiCartAlt = React.lazy(() =>
  import('react-icons/bi').then((module) => ({ default: module.BiCartAlt }))
)
const ShareIcon = React.lazy(() =>
  handleLazyLoadSvgPromise(import('../../../assets/images/share.svg'))
)
const ExchangeIcon = React.lazy(() =>
  handleLazyLoadSvgPromise(import('../../../assets/images/exchange.svg'))
)
const TransportIcon = React.lazy(() =>
  handleLazyLoadSvgPromise(import('../../../assets/images/transport.svg'))
)
const ShopIcon = React.lazy(() =>
  handleLazyLoadSvgPromise(import('../../../assets/images/shop.svg'))
)
const HeartIcon = React.lazy(() =>
  handleLazyLoadSvgPromise(import('../../../assets/images/heart.svg'))
)
const CopyIcon = React.lazy(() =>
  handleLazyLoadSvgPromise(import('../../../assets/images/copy.svg'))
)
let delay

const ProductView = (props) => {
  const swiperRef = useRef(null)
  const [selectItem, setSelectItem] = useState(null)
  const [activeThumb, setActiveThumb] = useState(0)
  const [quantityToAdd, setQuantityToAdd] = useState(1)
  const { product } = props
  const dispatch = useDispatch()
  const quantityRef = useRef(null)
  console.log('quantityToAdd::', quantityToAdd)
  // const [onChangeCartBadge, toggleCartAnimation] = useToggle()

  const slideTo = useCallback((index) => {
    swiperRef.current?.swiper.slideToLoop(index)
    console.log(swiperRef.current?.swiper)
  }, [])

  const listProductItem = useMemo(() => {
    return product?.collections[activeThumb].inventory.reduce(
      (result, item) => result.concat(item),
      []
    )
  }, [product, activeThumb])

  const prodImages = useMemo(
    () => product?.collections?.map((item) => item.url),
    [product]
  )

  const prodThumbImages = useMemo(
    () => product?.collections?.map((item) => item.thumbUrl),
    [product]
  )

  const handleClickThumb = useCallback(
    (index) => {
      setActiveThumb(index)
      slideTo(index)
    },
    [slideTo]
  )

  const handleSlideChange = useCallback((index) => {
    setActiveThumb(index)
  }, [])

  const handleSelectSize = useCallback((item) => {
    setSelectItem(item)
  }, [])

  const handleClickAddToCart = useCallback(
    (e, item) => {
      // eslint-disable-next-line no-unused-vars
      const { quantity, ...rest } = item
      const { slug, title, price } = product

      // eslint-disable-next-line no-unused-vars
      const { inventory, itemId, ...rest2 } = product.collections[activeThumb]
      const payload = {
        ...rest, //
        ...rest2, // ...rest2 === colorName, colorCode, thumbUrl, url
        quantity: quantityToAdd * 1,
        slug,
        title,
        price
      }

      dispatch(putCartItem(payload))
      props.modal && props.closeModal && props.closeModal(e, false)

      //set animation
      clearTimeout(delay)

      const cartElement = document.querySelector('.cart-wrap.header__menu__item')

      cartElement.classList.add('active')
      setTimeout(() => {
        cartElement.classList.remove('active')
      }, 600)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeThumb, product, dispatch, quantityToAdd, props.modal, props.closeModal]
  )

  useEffect(() => {
    if (quantityRef && quantityRef.current?.value) {
      quantityRef.current.value = '1'
    }
  }, [product])

  useEffect(() => {
    setSelectItem(product?.collections[activeThumb].inventory[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, activeThumb])

  return product && !props.loading ? (
    <div className='product__wrap'>
      <div className='product__wrap__inner'>
        <div className='product__wrap__inner__left'>
          <Suspense>
            <ProductImagesSlider
              images={prodImages || []}
              ref={swiperRef}
              onSlideChange={handleSlideChange}
            />
          </Suspense>
        </div>
        <Suspense fallback={<div>...Loading</div>}>
          <div className='product__wrap__inner__right'>
            <div className='info__group title-section '>
              <h3 className='product__title'>{product.title}</h3>
              <div className='product__group__icon'>
                <HeartIcon className='product__icon' />
                <ShareIcon className='product__icon' />
              </div>
            </div>
            <div className='info__group id-section '>
              <p className='product__id'>{product.pId}</p>
              <CopyIcon className='product__icon' />
            </div>
            <div className='info__group  '>
              {product?.sale ? (
                <Fragment>
                  <span className='product__price'>228.650đ</span>
                  <span className='product__price--old'>
                    <del>269.000đ</del>
                  </span>
                </Fragment>
              ) : (
                <span className='product__price'>{numberToCurrency(product.price)}đ</span>
              )}
            </div>

            <div className='info__group product__remain '>
              <div className='remain'>
                Còn lại: {selectItem?.quantity} {''}
              </div>
              {/* <div className='seperate'>|</div>
              <div className='sold'>Đã bán: 30</div> */}
            </div>
            <div className='info__group product__color '>
              <div className='product__color__title'>
                Màu sắc: {product.collections[activeThumb].colorName}
              </div>
              <div className='product__thumbs'>
                {prodThumbImages?.map((image, index) => (
                  <div
                    className={classNames(`product__thumbs__item`, {
                      active: activeThumb === index
                    })}
                    key={index}
                    onClick={() => handleClickThumb(index)}
                  >
                    <div className='image__container'>
                      <img src={image} alt='' loading='lazy' />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='info__group size-quantity'>
              {selectItem && (
                <SelectSize
                  className='section-size'
                  title={selectItem.sizeName}
                  items={listProductItem}
                  onClick={handleSelectSize}
                />
              )}

              <QuantityInput
                className='section-quantity'
                quantity={quantityToAdd}
                onChange={(quantity) => {
                  console.log(quantity)
                  setQuantityToAdd(quantity * 1)
                }}
              />
            </div>
            <Button
              animate={true}
              icon={<BiCartAlt />}
              className={'btn-add2cart'}
              onClick={(e) => handleClickAddToCart(e, selectItem)}
            >
              Thêm vào giỏ hàng
            </Button>
            <Button backgroundColor={'white'} className={'btn-buy-product'}>
              Mua ngay
            </Button>
            <div className='info__group product__in__shop'>
              <div className='product__in__shop__btn'>
                <ShopIcon />
              </div>
              <div className='product__in__shop__txt'>Tìm tại cửa hàng</div>
            </div>
            <div className='policy'>
              <div className='policy__wrap'>
                <Link>
                  <div className='policy__wrap__icon  policy__transport'>
                    <TransportIcon />
                  </div>
                  <span className='policy__wrap__txt'>Chính sách vận chuyển</span>
                </Link>
              </div>
              <div className='policy__wrap '>
                <Link>
                  <div className='policy__wrap__icon policy__exchange'>
                    <ExchangeIcon />
                  </div>
                  <span className='policy__wrap__txt '>Bảo hành & Đổi trả </span>
                </Link>
              </div>
            </div>
          </div>
        </Suspense>
      </div>
      <div className='product__wrap__inner bottom'>
        {!props?.modal ? <ProductDescription content={product.description} /> : null}
      </div>
    </div>
  ) : (
    <ProductViewSkeleton />
  )
}

const SelectSize = React.memo((props) => {
  const handleClick = (item) => {
    if (props.onClick) {
      props.onClick(item)
      console.log(item)
    }
  }
  return (
    <CustomSelect title={props.title} className={props.className}>
      {props.items?.map((item, index) => (
        <div
          key={index}
          className='custom-select__content__dropdown__option'
          onClick={() => handleClick(item)}
        >
          {item?.sizeName}
        </div>
      ))}
    </CustomSelect>
  )
})
SelectSize.displayName = 'SelectSize'

const ProductDescription = React.memo((props) => {
  return (
    <div className='container tab-list'>
      <div className='product-tabs'>
        <div className='product-tabs__item'>Chi tiết sản phẩm</div>
        {/* <div className='product-tabs__item'>Đánh giá sản phẩm</div> */}
      </div>
      <div className='tab-container'>
        <div className='product-description'>
          <p className='product-description__title'>Mô tả sản phẩm</p>
          <div
            className='product-description__content'
            dangerouslySetInnerHTML={{ __html: props.content }}
          />
        </div>
      </div>
    </div>
  )
})
ProductDescription.displayName = 'ProductDescription'

ProductView.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    pId: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    description: PropTypes.string,
    collections: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        itemId: PropTypes.string.isRequired,
        colorName: PropTypes.string.isRequired,
        colorCode: PropTypes.string.isRequired,
        inventory: PropTypes.arrayOf(
          PropTypes.shape({
            pId: PropTypes.string,
            itemId: PropTypes.string.isRequired,
            sizeId: PropTypes.string.isRequired,
            sizeName: PropTypes.string.isRequired,
            quantity: PropTypes.number.isRequired
          })
        ),
        thumbUrl: PropTypes.string.isRequired
      })
    ),
    price: PropTypes.number.isRequired,
    sold: PropTypes.number,
    sale: PropTypes.number
  }),
  modal: PropTypes.bool,
  closeModal: PropTypes.func,
  loading: PropTypes.bool
}
SelectSize.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string
}

ProductDescription.propTypes = {
  content: PropTypes.string.isRequired
}
export default React.memo(ProductView)
