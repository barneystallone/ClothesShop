import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import FilterLeft from './FilterLeft'
import Grid from '../../../components/Grid'
import SubCategoryFilter from './SubCategoryFilter'
import { useGetCategoriesQuery } from '../../../features/category/category.service'
import { useDispatch, useSelector } from 'react-redux'
import {
  initCategoryFilters,
  selectAllCategoryFilters
} from '../../../features/product/product.slice'
import { useSearchParams } from 'react-router-dom'
import { object } from 'joi'

const CategoryFilter = (props) => {
  // const { data: categories, isLoading } = useGetCategoriesQuery(undefined, { skip: true });
  // const dispatch = useDispatch()
  // const { data: categories, isLoading, isSuccess } = useGetCategoriesQuery()
  // useEffect(() => {
  //   if (isSuccess && categories) {
  //     dispatch(initCategoryFilters(categories.length))
  //   }
  // }, [categories, isSuccess, dispatch])
  const { categories, isLoading } = props

  return (
    <FilterLeft title='Danh mục'>
      <Grid col={1} gap={10}>
        {isLoading ? (
          <Skeleton
            count={4}
            duration={0.6}
            height={20}
            style={{ marginBottom: '10px' }}
          />
        ) : (
          categories?.map((item, index) => (
            <SubCategoryFilter key={index} item={item} index={index} />
          ))
        )}
      </Grid>
    </FilterLeft>
  )
}
CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool
}
export default React.memo(CategoryFilter)
