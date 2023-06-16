import React, { useEffect, useMemo, useState } from 'react'
import qs from 'qs'

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
import { useSearchParams } from 'react-router-dom'
import {
  initCategoryFilters,
  selectAllCategoryFilters
} from '../../features/product/product.slice'
import { useGetCategoriesQuery } from '../../features/category/category.service'
import { capitalizeWords } from '../../utils'

let count = 1
//Nên dùng React-window để render list
const ShowProductList = () => {
  // console.log(count++)
  // const dispatch = useDispatch()

  const allCateFilters = useSelector(selectAllCategoryFilters)
  const [searchParams, setSearchParams] = useSearchParams()
  const [isSyncParamToStore, setSyncParamToStore] = useState(false)
  const [isSyncPageParam, setSyncPageParam] = useState(false)
  const [loading, setLoading] = useState(false)
  const activePage = useSelector(selectActivePage) // Theo dõi cái biến này, nếu có dispatch mà thay đổi dữ liệu thì nó cũng cập nhật
  const dispatch = useDispatch()

  const { page, c, keyword } = useMemo(
    () => qs.parse(searchParams.toString()),
    [searchParams]
  )
  //----- useGetCategoriesQuery() => Gửi request lên server lấy ra danh sách danh mục
  const {
    data: categories,
    isLoading: isCateLoading,
    isSuccess
  } = useGetCategoriesQuery()

  //----- useGetProductsQuery() => Gửi request(yêu cầu) lên server lấy ra danh sách danh mục
  const { data, isFetching, isLoading } = useGetProductsQuery(
    {
      page: activePage,
      c: allCateFilters,
      keyword: keyword ? capitalizeWords(keyword.trim()) : null
    },
    {
      skip: !activePage,
      pollingInterval: 1000 * 2 * 60
    }
  )

  //============- Map filter params vào store khi load xong category
  useEffect(() => {
    if (isSuccess && categories && !isSyncParamToStore) {
      const initArray = Array.from({ length: categories.length }, () => [])
      if (c) {
        const filterArray = c.split('|')
        // console.log(filterArray)
        const extractSubCateId = categories.map((parent) =>
          parent.sub_category.map((i) => i.id)
        )
        // console.log('extractSubCate', extractSubCateId)
        const position = filterArray.map((filterItem) => {
          for (let i = 0; i < extractSubCateId.length; i++) {
            if (extractSubCateId[i].indexOf(filterItem) !== -1) {
              return i
            }
          }
          return -1 // không tìm thấy
        })
        filterArray.forEach((item, index) => {
          initArray[position[index]].push(item)
        })
        console.log('initArray', initArray)
      }
      dispatch(initCategoryFilters(initArray))
      setSyncParamToStore(true)
    }
  }, [categories, isSuccess, dispatch, isSyncParamToStore, c])

  useEffect(() => {
    if (page && !Number(page)) {
      searchParams.delete('page')
      setSearchParams(searchParams)
    }
    dispatch(setActivePage(page * 1 || 1))
    setSyncPageParam(true)

    return () => {
      dispatch(setActivePage(1))
      dispatch(setTotalPage(1))
    }
  }, [])

  //=========== Set searchParams khi người dùng thay đổi filter
  useEffect(() => {
    if (allCateFilters && allCateFilters?.length) {
      searchParams.set('c', allCateFilters.join('|'))
      if (isSyncPageParam === true && isSyncParamToStore === true) {
        console.log(isSyncPageParam)
        searchParams.set('page', 1)
        dispatch(setActivePage(1))
      }
      setSearchParams(searchParams)
    } else {
      searchParams.delete('c')
      setSearchParams(searchParams)
    }
  }, [allCateFilters, dispatch])

  useEffect(() => {
    window.scrollTo({
      top: 70,
      left: 0,
      behavior: 'smooth'
    })
  }, [loading, isLoading])

  //============== Pagination
  useEffect(() => {
    const pages = Math.ceil(data?.total / data?.itemPerPage) || 1
    if (data && activePage > pages) {
      dispatch(setActivePage(1))
      searchParams.set('page', 1)
      setSearchParams(searchParams)
    }
    dispatch(setTotalPage(pages))
  }, [data, dispatch, activePage, setSearchParams, searchParams])

  //============== Animation loading
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
          <CategoryFilter categories={categories} isLoading={isCateLoading} />
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
