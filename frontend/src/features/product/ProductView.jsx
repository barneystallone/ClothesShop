import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Grid from '../../components/Grid'
import ProductCard from './ProductCard'
import ProductImagesSlider from './ProductImagesSlider'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import Button from '../../components/Button'

const ProductView = props => {
    const product = props.product;
    const [previewImg, setPreviewImg] = useState(product.colors[1].image01)
    const prodImages = product.colors.map(color => color.image01)

    return (
        <div className="product__wrap">
            <div className="product__wrap__inner">
                <div className="product__wrap__inner__left">
                    {/* <div className="product__images">
                        <div className="product__images__list">
                            {
                                product.colors.map((item, index) => (
                                    <div key={index} className="product__images__list__item" onClick={() => setPreviewImg(item.image01)}>
                                        <img src={item.image01} alt="" />
                                    </div>

                                ))
                            }

                        </div>
                        <div className="product__images__main">
                            <img src={previewImg} alt="" />
                        </div>

                    </div> */}
                    <ProductImagesSlider images={prodImages} />
                </div>
                <div className="product__wrap__inner__right">
                    <h3 className="section-name"></h3>
                    <div className="product-price-wrapper">

                    </div>
                    <div className="product-color-wrapper">

                    </div>
                    <div className="section-size">

                    </div>
                    <Button></Button>
                </div>
            </div>
            <div className="product__wrap__inner__bottom">
                <div className="tab-list">
                    <ul className="product-tabs"></ul>
                    <div className="tab-container">
                        <div className="tab-content">
                            <div className="product-description">
                                bottom
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


ProductView.propTypes = {
    product: PropTypes.object,
}

export default ProductView