import React, { useEffect, useMemo, useState } from 'react'
import { useGetProductsQuery } from '../../features/product/product.service'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectActivePage,
  setActivePage,
  setTotalPage
} from '../../features/pagination/pagination.slice'

import Helmet from '../../components/Helmet'
import size from '../../assets/fake-data/product-size'
import CheckBox from '../../components/Checkbox'
import ProductList from './components/ProductList'
import FilterLeft from './components/FilterLeft'
import CategoryFilter from './components/CategoryFilter'
import Grid from '../../components/Grid'
import Pagination from '../../features/pagination'

let count = 1
//Nên dùng React-window để render list
const ShowProductList = () => {
  // console.log(count++)
  // const [searchParams, setSeachParams] = useSearchParams()
  // const dispatch = useDispatch()
  // const searchParamsObj = useMemo(() => {
  //   const params = {}
  //   searchParams.forEach((value, key) => (params[key] = value))
  //   return params
  // }, [searchParams])
  const [loading, setLoading] = useState(false)
  const activePage = useSelector(selectActivePage)
  const dispatch = useDispatch()
  const { data, isFetching, isLoading } = useGetProductsQuery(
    { page: activePage },
    {
      skip: !activePage,
      pollingInterval: 1000 * 2 * 60
    }
  )
  React.useEffect(() => {
    window.scrollTo({
      top: 70,
      left: 0,
      behavior: 'smooth'
    })
  }, [loading, isLoading])

  useEffect(() => {
    return () => {
      dispatch(setActivePage(1))
      dispatch(setTotalPage(1))
    }
  }, [])
  useEffect(() => {
    const pages = Math.ceil(data?.total / data?.itemPerPage) || 1
    dispatch(setTotalPage(pages))
  }, [data, dispatch])

  useEffect(() => {
    let delay
    setLoading(true)
    delay = setTimeout(() => {
      setLoading(false)
    }, 500)
    return () => {
      clearTimeout(delay)
    }
  }, [activePage])
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
          <ProductList
            data={data?.products}
            hasCallApi={loading || isFetching || isLoading}
          />
          <Pagination />
        </div>
      </div>
    </Helmet>
  )
}

export default React.memo(ShowProductList)
