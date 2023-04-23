import React, { useCallback, useState } from 'react'
import Helmet from '../../components/Helmet'
import Section, { SectionBody, SectionTitle } from '../../components/Section'
// import ProductView from '../../features/product/ProductView'
import { ReactComponent as ShareIcon } from '../../assets/images/share.svg'
import { ReactComponent as HeartIcon } from '../../assets/images/heart.svg'
import { ReactComponent as CopyIcon } from '../../assets/images/copy.svg'

import productData from '../../assets/fake-data/products'
import { useParams } from 'react-router-dom'
import ProductImagesSlider from './components/ProductImageSlider'
import Button from '../../components/Button'
import RelatedProducts from './components/RelatedProducts'
import sizes from '../../assets/fake-data/product-size'
import SelectSize from './components/SelectSize'
import QuantityInput from '../../components/QuantityInput'

const ProductDetail = (props) => {
  const [size, setSize] = useState(sizes[0]);

  const handleSelectSize = useCallback((elm) => {
    setSize(sizes[elm.dataset.index])
    // console.log(sizes[elm.dataset.index]);
  }, [])
  const { slug } = useParams();
  const product = productData.getProductBySlug(slug);
  const prodImages = product.colors.map(color => color.image01)
  const prodThumbImages = product.colors.map(color => color.image02)
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [product])
  const relatedProducts = productData.getProducts(5)
  return (
    <Helmet title={product.title}>
      <Section>
        <SectionBody>
          <div className="product__wrap">
            <div className="product__wrap__inner">
              <div className="product__wrap__inner__left">
                <ProductImagesSlider images={prodImages} />
              </div>
              <div className="product__wrap__inner__right">
                <div className="info__group title-section ">
                  <h3 className='product__title'>Váy Thiết Kế Chỉ Nổi Thắt Nơ Cổ</h3>
                  <div className='product__group__icon'>
                    <HeartIcon className='product__icon' />
                    <ShareIcon className='product__icon' />
                  </div>
                </div>
                <div className="info__group id-section ">
                  <p className='product__id'>2302VDU8882101</p>
                  <CopyIcon className='product__icon' />
                </div>
                <div className="info__group  ">

                  <span className='product__price'>228.650đ</span>
                  <span className='product__price--old'><del>269.000đ</del></span>
                </div>
                <div className="info__group product__remain ">
                  <div className="remain">Còn lại: 30</div>
                  <div className="seperate">|</div>
                  <div className="sold">Đã bán: 30</div>

                </div>
                <div className="info__group product__color ">
                  <div className="product__color__title">Màu sắc: Be</div>
                  <div className="product__thumbs">
                    {
                      prodThumbImages?.map((image, index) => (
                        <div className="product__thumbs__item" key={index}>
                          <div className='image__container'>
                            <img src={image} alt="" />

                          </div>
                        </div>

                      ))
                    }

                  </div>

                </div>
                <div className="info__group size-quantity">
                  <SelectSize className="section-size" title={size.display} sizes={sizes} onClick={handleSelectSize} />
                  <QuantityInput className="section-quantity" />
                </div>
                {/* <Button></Button> */}
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
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>
          Khám phá thêm
        </SectionTitle>
        <SectionBody>
          <RelatedProducts relatedProducts={relatedProducts} />
        </SectionBody>
      </Section>
    </Helmet>
  )
}

export default ProductDetail