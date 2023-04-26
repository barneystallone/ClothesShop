import React from 'react'
import PropTypes from 'prop-types'
import Grid from '../../../components/Grid'
import { ProductCard } from '../../../features/product'

const RelatedProducts = (props) => {
  const { relatedProducts } = props

  return (
    relatedProducts && (
      <Grid col={5} mdCol={2} smCol={1} gap={20}>
        {relatedProducts?.map((item, index) => (
          <ProductCard
            pId={item.pId}
            key={index}
            title={item.title}
            img={item.img}
            price={Number(item.price)}
            slug={item.slug}
            sale={Number(item.sale)}
          />
        ))}
      </Grid>
    )
  )
}

RelatedProducts.propTypes = {
  relatedProducts: PropTypes.arrayOf(PropTypes.object)
}

export default RelatedProducts
