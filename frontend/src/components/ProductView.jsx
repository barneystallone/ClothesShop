import React, { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import QuantityInput from '../components/QuantityInput'
import ProductImagesSlider from './ProductImageSlider'
import Button from './Button'
import { HiShoppingCart } from 'react-icons/hi'
import CustomSelect from './CustomSelect'
import sizes from '../assets/fake-data/product-size'
import { Link } from 'react-router-dom'
import { ReactComponent as ShareIcon } from '../assets/images/share.svg'
import { ReactComponent as ExchangeIcon } from '../assets/images/exchange.svg'
import { ReactComponent as TransportIcon } from '../assets/images/transport.svg'
import { ReactComponent as ShopIcon } from '../assets/images/shop.svg'
import { ReactComponent as HeartIcon } from '../assets/images/heart.svg'
import { ReactComponent as CopyIcon } from '../assets/images/copy.svg'
// import { ReactSVG as SVG } from 'react-svg'
// import ShareIcon from '../assets/images/share.svg'
// import ExchangeIcon from '../assets/images/exchange.svg'
// import TransportIcon from '../assets/images/transport.svg'
// import ShopIcon from '../assets/images/shop.svg'
// import HeartIcon from '../assets/images/heart.svg'
// import CopyIcon from '../assets/images/copy.svg'

const ProductView = (props) => {
  const [size, setSize] = useState(sizes[0])

  const product = useMemo(() => props.product, [props.product])

  const handleSelectSize = useCallback((elm) => {
    setSize(sizes[elm.dataset.index])
    // console.log(sizes[elm.dataset.index]);
  }, [])

  const prodImages = useMemo(() => product?.colors?.map((color) => color.image01), [product])

  const prodThumbImages = useMemo(() => product?.colors?.map((color) => color.image02), [product])

  return (
    <div className='product__wrap'>
      <div className='product__wrap__inner'>
        <div className='product__wrap__inner__left'>
          <ProductImagesSlider images={prodImages} />
        </div>
        <div className='product__wrap__inner__right'>
          <div className='info__group title-section '>
            <h3 className='product__title'>Váy Thiết Kế Chỉ Nổi Thắt Nơ Cổ</h3>
            <div className='product__group__icon'>
              {/* <SVG src={HeartIcon} className='product__icon' />
              <SVG src={ShareIcon} className='product__icon' /> */}
              <HeartIcon className='product__icon' />
              <ShareIcon className='product__icon' />
            </div>
          </div>
          <div className='info__group id-section '>
            <p className='product__id'>2302VDU8882101</p>
            {/* <SVG src={CopyIcon} className='product__icon' /> */}
            <CopyIcon className='product__icon' />
          </div>
          <div className='info__group  '>
            <span className='product__price'>228.650đ</span>
            <span className='product__price--old'>
              <del>269.000đ</del>
            </span>
          </div>
          <div className='info__group product__remain '>
            <div className='remain'>Còn lại: 30</div>
            <div className='seperate'>|</div>
            <div className='sold'>Đã bán: 30</div>
          </div>
          <div className='info__group product__color '>
            <div className='product__color__title'>Màu sắc: Be</div>
            <div className='product__thumbs'>
              {prodThumbImages?.map((image, index) => (
                <div className='product__thumbs__item' key={index}>
                  <div className='image__container'>
                    <img src={image} alt='' />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='info__group size-quantity'>
            <SelectSize className='section-size' title={size.display} sizes={sizes} onClick={handleSelectSize} />
            <QuantityInput className='section-quantity' />
          </div>
          <Button animate={true} icon={<HiShoppingCart />} className={'btn-add2cart'}>
            Thêm vào giỏ hàng
          </Button>
          <Button backgroundColor={'white'} className={'btn-buy-product'}>
            Mua ngay
          </Button>
          <div className='info__group product__in__shop'>
            <div className='product__in__shop__btn'>
              <ShopIcon />
              {/* <SVG src={ShopIcon} /> */}
            </div>
            <div className='product__in__shop__txt'>Tìm tại cửa hàng</div>
          </div>
          <div className='policy'>
            <div className='policy__wrap'>
              <Link to={''}>
                <div className='policy__wrap__icon  policy__transport'>
                  <TransportIcon />
                  {/* <SVG src={TransportIcon} /> */}
                </div>
                <span className='policy__wrap__txt'>Chính sách vận chuyển</span>
              </Link>
            </div>
            <div className='policy__wrap '>
              <Link to={''}>
                <div className='policy__wrap__icon policy__exchange'>
                  <ExchangeIcon />
                  {/* <SVG src={ExchangeIcon} /> */}
                </div>
                <span className='policy__wrap__txt '>Bảo hành & Đổi trả </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='product__wrap__inner bottom'>{!props?.modal ? <ProductDescription /> : null}</div>
    </div>
  )
}

const SelectSize = React.memo((props) => {
  const handleClick = (e) => {
    if (props.onClick) {
      props.onClick(e.target)
    } else {
      console.log(e.target.dataset.index)
    }
  }
  return (
    <CustomSelect title={props.title} className={props.className}>
      {props.sizes?.map((size, index) => (
        <div key={index} className='custom-select__content__dropdown__option' onClick={handleClick} data-index={index}>
          {size.display}
        </div>
      ))}
    </CustomSelect>
  )
})

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
          <div className='product-description__content'>
            <p>
              <strong>* THÔNG TIN SẢN PHẨM</strong>
            </p>

            <p>- Tên sản phẩm:&nbsp;Váy Xốp Thắt Nơ Lưng Dáng Dài</p>

            <p>- Phù hợp: Mặc đi học, đi làm, đi chơi.</p>

            <p>- Chất liệu: Vải xốp</p>

            <p>- Bảng màu: Trắng/ Đen</p>

            <p>- Họa tiết: Trơn</p>

            <p>- Xuất xứ: Sản phẩm tự thiết kế và sản xuất bởi FM Style tại Việt Nam</p>

            <p>- Cam kết 100% chất lượng từ chất vải đến đường chỉ, phát hiện lỗi được hoàn trả miễn phí.</p>

            <p>&nbsp;</p>

            <p>
              <strong>* HƯỚNG DẪN CHỌN SIZE CHO BẠN</strong>
            </p>

            <p>- Free size &lt;62kg</p>

            <p>
              Hướng dẫn chọn size ở trên chỉ mang tính chất tham khảo tương đối, tuỳ vào chiều cao và số đo cơ thể mà
              bạn có thể thay đổi&nbsp;để chọn đúng size sản phẩm phù hợp.
            </p>

            <p>&nbsp;</p>

            <p>
              <strong>* HƯỚNG DẪN BẢO QUẢN VÀ SỬ DỤNG</strong>
            </p>

            <p>- Lần đầu chỉ xả nước lạnh rồi phơi khô để đảm bảo chất và màu của sản phẩm.</p>

            <p>- Nhớ lộn trái sản phẩm khi giặt và không giặt ngâm.</p>

            <p>- Không giặt máy trong 2 tuần đầu.</p>

            <p>- Không sử dụng thuốc tẩy - Khi phơi lộn trái và không phơi trực tiếp dưới ánh nắng mặt trời.</p>
          </div>
        </div>
      </div>
    </div>
  )
})

ProductView.propTypes = {
  product: PropTypes.object.isRequired
}
SelectSize.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
  sizes: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
  modal: PropTypes.bool
}

export default React.memo(ProductView)
