import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { ProductCard } from '../../../features/product'
import Grid from '../../../components/Grid'
import Skeleton from 'react-loading-skeleton'

//Nên dùng React-window để render list thay cho dùng map để tối ưu
const ProductList = (props) => {
  const perLoad = 8

  const skeletons = useMemo(
    () =>
      Array.from({ length: perLoad }, (_, i) => (
        <div key={i} style={{ backgroundColor: '#fff' }}>
          <Skeleton duration={0.6} height={300} />
          <p>
            <Skeleton duration={0.6} height={25} style={{ marginTop: '8px' }} />
            <Skeleton duration={0.6} height={25} style={{ marginTop: '8px' }} />
            <Skeleton duration={0.6} height={25} style={{ marginTop: '8px' }} />
          </p>
        </div>
      )),
    []
  )

  return (
    <Grid col={4} mdCol={3} smCol={2} gap={20}>
      {props.hasCallApi ? (
        [...skeletons]
      ) : (
        <>
          {props.data?.map(({ price, sold, ...rest }, index) => (
            <ProductCard {...rest} key={index} price={Number(price)} sold={Number(sold)} />
          ))}
        </>
      )}
    </Grid>
  )
}

ProductList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  hasCallApi: PropTypes.bool.isRequired
}

export default React.memo(ProductList)
