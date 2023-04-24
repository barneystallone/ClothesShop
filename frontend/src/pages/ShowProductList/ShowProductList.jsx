import React from 'react'
import { useGetProductsQuery } from '../../features/product/product.service'

import Helmet from '../../components/Helmet'
import size from '../../assets/fake-data/product-size'
import CheckBox from '../../components/Checkbox'
import InfinityList from './components/InfinityList'
import FilterLeft from './components/FilterLeft'
import CategoryFilter from './components/CategoryFilter'
import Grid from '../../components/Grid'

const ShowProductList = () => {
  // const products = useMemo(productData.getAllProducts());
  const { data, isFetching, isLoading } = useGetProductsQuery(undefined, {
    pollingInterval: 1000 * 2 * 60
  })
  // console.log(products)
  // const [products, setProducts] = useState([])

  // useEffect(() => {
  //   setProducts(productData.getAllProducts())
  // }, [])

  return (
    <Helmet title='Sản phẩm'>
      <div className='product'>
        <div className='product-filter'>
          <CategoryFilter />
          <FilterLeft title='Kích cỡ'>
            <Grid col={2} mdCol={1} gap={6}>
              {size.map((item, index) => (
                <div key={index} className='filter-left__content__item'>
                  <CheckBox label={item.display} />
                </div>
              ))}
            </Grid>
          </FilterLeft>
        </div>
        <div className='product-content'>
          <InfinityList resp={data} hasCallApi={isFetching || isLoading} />
        </div>
      </div>
    </Helmet>
  )
}

export default ShowProductList
