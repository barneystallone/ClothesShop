import React, { Suspense } from 'react'
import Helmet from '../../components/Helmet'
import Section, { SectionBody, SectionTitle } from '../../components/Section'
// import productData from '../../assets/fake-data/products'
import RelatedProducts from './components/RelatedProducts'
import { ProductView } from '../../features/product/'
// const ProductView = React.lazy(() =>
//   import('../../features/product').then((module) => ({ default: module.ProductView }))
// )
import { useParams } from 'react-router-dom'
import {
  useGetProductQuery,
  useGetRelatedProductsQuery
} from '../../features/product/product.service'

const ProductDetail = () => {
  const { slug } = useParams()
  // const product = productData.getProductBySlug(slug) || {}
  const { data } = useGetProductQuery(slug, { skip: !slug })
  const { data: relatedRes } = useGetRelatedProductsQuery(slug, { skip: !slug })

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [data?.product])
  // const relatedProducts = productData.getProducts(5)
  return (
    data?.product && (
      <Helmet title={data?.title}>
        <Section>
          <SectionBody>
            <Suspense fallback=''>
              <ProductView product={data?.product} />
            </Suspense>
          </SectionBody>
        </Section>
        <Section>
          <SectionTitle>Khám phá thêm</SectionTitle>
          <SectionBody>
            <RelatedProducts relatedProducts={relatedRes?.products} />
          </SectionBody>
        </Section>
      </Helmet>
    )
  )
}

export default React.memo(ProductDetail)
