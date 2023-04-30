import React from 'react'
import PropTypes from 'prop-types'
import Grid from '../../../components/Grid'
import { ProductCard } from '../../../features/product'

const RelatedProducts = (props) => {
  const { relatedProducts } = props

  return (
    relatedProducts && (
      <Grid col={5} mdCol={2} smCol={1} gap={20}>
        {relatedProducts?.map(({ price, sold, ...rest }, index) => (
          <ProductCard key={index} {...rest} price={Number(price)} sale={Number(sold)} />
        ))}
      </Grid>
    )
  )
}

RelatedProducts.propTypes = {
  relatedProducts: PropTypes.arrayOf(PropTypes.object)
}

export default RelatedProducts
