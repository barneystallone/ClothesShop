import React from 'react'
import Helmet from '../../components/Helmet'
import Section, { SectionBody, SectionTitle } from '../../components/Section'
// import productData from '../../assets/fake-data/products'
import RelatedProducts from './components/RelatedProducts'
import { ProductView } from '../../features/product/'
import { useParams } from 'react-router-dom'
import { useGetProductQuery, useGetRelatedProductsQuery } from '../../features/product/product.service'

const ProductDetail = () => {
  const { slug } = useParams()
  // const product = productData.getProductBySlug(slug) || {}
  const { data } = useGetProductQuery(slug, { skip: !slug })
  const { data: relatedResp } = useGetRelatedProductsQuery(slug, { skip: !slug })

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [data?.product])
  // const relatedProducts = productData.getProducts(5)
  return (
    <Helmet title={data?.product?.title}>
      <Section>
        <SectionBody>
          <ProductView product={data?.product} />
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>Khám phá thêm</SectionTitle>
        <SectionBody>
          <RelatedProducts relatedProducts={relatedResp?.products} />
        </SectionBody>
      </Section>
    </Helmet>
  )
}

export default ProductDetail
