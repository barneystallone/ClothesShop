import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import Button from '../../../components/Button'
const GoLogin = React.lazy(() =>
  import('../../../assets/images/go_login.svg').then(({ ReactComponent }) => ({
    default: ReactComponent
  }))
)
import QuantityInput from '../../../components/QuantityInput'
const SubCart = (props) => {
  return (
    <>
      <div className='overlay'></div>
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
            <SubCartBody />
            <div className='subCart__footer'>
              <div className='subCart__footer__item  total-price-wrap'>
                Tổng cộng: <span>9.650.000đ</span>
              </div>
              <Button className='btn-xemGioHang'>Xem giỏ hàng </Button>
            </div>
          </Suspense>
        </div>
      </div>
    </>
  )
}

const SizeColorGroup = () => {
  return <div className='size-color__group'>Hồng / Freesize</div>
}

const SubCartBody = React.memo(() => {
  return (
    <div className='body-wrapper'>
      <div className='subCart__body'>
        <div className='subCart__body__item'>
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
              <SizeColorGroup />
            </div>
            <div className='cart-item--right-bot'>
              <QuantityInput className='item-quantity' />
              <div className='item__total__price '>
                Tổng cộng: <span>9.650.000đ</span>
              </div>
            </div>
          </div>
        </div>
        <div className='subCart__body__item'>
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
              <SizeColorGroup />
            </div>
            <div className='cart-item--right-bot'>
              <QuantityInput className='item-quantity' />
              <div className='item__total__price '>
                Tổng cộng: <span>9.650.000đ</span>
              </div>
            </div>
          </div>
        </div>
        <div className='subCart__body__item'>
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
              <SizeColorGroup />
            </div>
            <div className='cart-item--right-bot'>
              <QuantityInput className='item-quantity' />
              <div className='item__total__price '>
                Tổng cộng: <span>9.650.000đ</span>
              </div>
            </div>
          </div>
        </div>
        <div className='subCart__body__item'>
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
              <SizeColorGroup />
            </div>
            <div className='cart-item--right-bot'>
              <QuantityInput className='item-quantity' />
              <div className='item__total__price '>
                Tổng cộng: <span>9.650.000đ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

SubCartBody.displayName = 'SubCartBody'

SubCart.propTypes = {}

export default SubCart
