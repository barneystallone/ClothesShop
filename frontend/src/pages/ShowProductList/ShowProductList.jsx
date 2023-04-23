import React from 'react'
import productData from '../../assets/fake-data/products'
import Helmet from '../../components/Helmet'
import size from '../../assets/fake-data/product-size'
import CheckBox from '../../components/Checkbox'

// import FilterLeft from '../../features/catalog/FilterLeft'
// import CategoryFilter from '../../features/catalog/CategoryFilter'
// import Grid from '../../components/Grid'
import InfinityList from './components/InfinityList'
import FilterLeft from './components/FilterLeft'
import CategoryFilter from './components/CategoryFilter'
import Grid from '../../components/Grid'
const ShowProductList = () => {

  const products = productData.getAllProducts();


  return (
    <Helmet title='Sản phẩm'>
      <div className="product">
        <div className="product-filter">
          <CategoryFilter />
          <FilterLeft title='Kích cỡ'>
            <Grid
              col={2}
              mdCol={1}
              gap={6}
            >
              {
                size.map((item, index) => (
                  <div key={index} className="filter-left__content__item">
                    <CheckBox
                      label={item.display}
                    />
                  </div>
                ))
              }
            </Grid>
          </FilterLeft>

        </div>
        <div className="product-content">
          <InfinityList
            data={products}
          />
        </div>
      </div>

    </Helmet>
  )
}

export default ShowProductList