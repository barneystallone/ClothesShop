import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import FilterLeft from './FilterLeft'
import Grid from '../../../components/Grid'
import SubCategoryFilter from './SubCategoryFilter'
import { useGetCategoriesQuery } from '../../../app/category/category.service'

const CategoryFilter = (props) => {
    // const { data: categories, isLoading } = useGetCategoriesQuery(undefined, { skip: true });

    const { data: categories, isLoading } = useGetCategoriesQuery();

    return (
        <FilterLeft title='Danh mục'>
            <Grid
                col={1}
                gap={10}
            >
                {
                    isLoading ? (
                        <Skeleton count={4} height={20} style={{ marginBottom: '10px' }} />
                    ) : (
                        categories?.map((item, index) => (

                            <SubCategoryFilter key={index} item={item} />

                        ))
                    )
                }

            </Grid>
        </FilterLeft >
    )
}

export default CategoryFilter


