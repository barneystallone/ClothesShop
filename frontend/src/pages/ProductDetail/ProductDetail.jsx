import React, { useCallback, useState } from 'react'
import Helmet from '../../components/Helmet'
import Section, { SectionBody, SectionTitle } from '../../components/Section'
import productData from '../../assets/fake-data/products'
import { useParams } from 'react-router-dom'
import RelatedProducts from './components/RelatedProducts'
import ProductView from '../../components/ProductView'

const ProductDetail = (props) => {

  const { slug } = useParams();
  const product = productData.getProductBySlug(slug) || {};

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [product])
  const relatedProducts = productData.getProducts(5)
  return (
    <Helmet title={product.title}>
      <Section>
        <SectionBody>
          <ProductView product={product} />

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