import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

const ProductImagesSlider = React.forwardRef((props, ref) => {
  const [activeThumb, setActiveThumb] = useState()

  const handleSlideChange = (swiper) => {
    if (props?.onSlideChange) {
      props.onSlideChange(swiper.realIndex)
    }
  }

  return (
    <>
      <Swiper
        // onClick={() => console.log(ref.current?.swiper.realIndex)}
        loop={true}
        spaceBetween={20}
        direction='vertical'
        allowTouchMove={true}
        modules={[Thumbs]}
        slidesPerView={4}
        onSwiper={(swiper) => {
          setActiveThumb(swiper)
        }}
        grabCursor={true}
        className='product__images__slider__thumbs'
      >
        {props.images?.map((item, index) => (
          <SwiperSlide key={index} className='wrapper-img'>
            <img
              loading='lazy'
              src={item}
              alt=''
              // onClick={() => {
              //   const swiper = document.querySelector('.swiper ').swiper
              //   swiper.update(null)
              // }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSlideChange={handleSlideChange}
        loop={true}
        spaceBetween={20}
        ref={ref}
        thumbs={{ swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null }}
        navigation={true}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
        className='product__images__slider'
      >
        {props.images?.map((item, index) => (
          <SwiperSlide key={index} className='wrapper-img'>
            <img loading='lazy' src={item} alt='' />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
})

ProductImagesSlider.displayName = 'ProductImagesSlider'
ProductImagesSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSlideChange: PropTypes.func
}

export default React.memo(ProductImagesSlider)
