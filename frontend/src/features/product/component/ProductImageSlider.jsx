import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
const ProductImagesSlider = (props) => {
  const swiperRef = useRef(null)
  // const swiperThumbRef = useRef(null);
  const [activeThumb, setActiveThumb] = useState()

  // const toSlide = (num) => {
  //   console.log('go to slide', num)
  //   swiperRef.current?.swiper.slideToLoop(num)
  //   console.log(swiperRef.current?.swiper)
  // }

  return (
    <>
      <Swiper
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
              onClick={() => {
                const swiper = document.querySelector('.swiper ').swiper
                swiper.update(null)
              }}
            />
          </SwiperSlide>
        ))}
        {props.images?.map((item, index) => (
          <SwiperSlide key={index} className='wrapper-img'>
            <img
              loading='lazy'
              src={item}
              alt=''
              onClick={() => {
                const swiper = document.querySelector('.swiper ').swiper
                swiper.update(null)
              }}
            />
          </SwiperSlide>
        ))}
        {props.images?.map((item, index) => (
          <SwiperSlide key={index} className='wrapper-img'>
            <img
              loading='lazy'
              src={item}
              alt=''
              onClick={() => {
                const swiper = document.querySelector('.swiper ').swiper
                swiper.update(null)
              }}
            />
          </SwiperSlide>
        ))}
        {props.images?.map((item, index) => (
          <SwiperSlide key={index} className='wrapper-img'>
            <img
              src={item}
              alt=''
              onClick={() => {
                const swiper = document.querySelector('.swiper ').swiper
                swiper.update(null)
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        loop={true}
        spaceBetween={20}
        ref={swiperRef}
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
      {/* <button onClick={() => toSlide(0)} >
                slide 0
            </button>
            <button onClick={() => toSlide(1)} >
                slide 1
            </button> */}
    </>
  )
}

ProductImagesSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default React.memo(ProductImagesSlider)
