import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Thumbs, Swiper as sw } from "swiper";
const ProductImagesSlider = props => {
    
    const [activeThumb, setActiveThumb] = useState();

    
    

    // activeThumb.slideNext()
    return (
        <>
            <Swiper
                loop={true}
                spaceBetween={20}
                direction='vertical'
                allowTouchMove={true}
                modules={[Thumbs]}
                slidesPerView={4}
                allowSlideNext={true}
                allowSlidePrev={true}

                onSwiper={(swiper) => {
                    setActiveThumb(swiper)
               }}
                grabCursor={true}
                className='product__images__slider__thumbs'
            >


                {
                    props.images.map((item, index) => (


                        <SwiperSlide key={index}>
                            <img src={item} alt="" onClick={()=> {const swiper = document.querySelector('.swiper ').swiper;
        swiper.update(null)}}/>
                        </SwiperSlide>


                    ))
                }

            </Swiper>
            <Swiper
                loop={true}
                spaceBetween={20}
                thumbs={{ swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null }}
                navigation={true}
                allowSlideNext={true}
                allowSlidePrev={true}
                allowTouchMove={true}
                modules={[Navigation, Thumbs]}
                grabCursor={true}
                className='product__images__slider'
            >


                {
                    props.images.map((item, index) => (
                        <SwiperSlide key={index}>
                            <img src={item} alt="" />
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </>
    )
}

ProductImagesSlider.propTypes = {}

export default ProductImagesSlider