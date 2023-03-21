import React from 'react'
import Helmet from '../components/Helmet'
import Section, { SectionBody, SectionTitle } from '../components/Section'
import ProductView from '../features/product/ProductView'

import productData from '../assets/fake-data/products'
import ProductCard from '../features/product/ProductCard'
import Grid from '../components/Grid'
import { useParams } from 'react-router-dom'
const Product = (props) => {

  const { slug } = useParams();
  console.log(slug)
  const product = productData.getProductBySlug(slug);
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
          <Grid
            col={5}
            mdCol={2}
            smCol={1}
            gap={20}
          >
            {
              relatedProducts.map((item, index) => (
                <ProductCard
                  categorySlug={item.categorySlug}
                  key={index}
                  title={item.title}
                  colors={item.colors}
                  price={Number(item.price)}
                  slug={item.slug}
                  sale={Number(item.sale)}
                />
              ))
            }
          </Grid>
        </SectionBody>
      </Section>
    </Helmet>
  )
}

export default Product