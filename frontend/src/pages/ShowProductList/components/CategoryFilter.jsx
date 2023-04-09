import React, { useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../../../app/category/category.slice'
import FilterLeft from './FilterLeft'
import Grid from '../../../components/Grid'
import SubCategoryFilter from './SubCategoryFilter'
import { useGetCategoriesQuery } from '../../../app/category/category.service'

const CategoryFilter = (props) => {
    const { data: categories, isLoading } = useGetCategoriesQuery();
    // const { categories, isLoading } = useSelector(state => state.category)
    const dispatch = useDispatch();

    // useEffect(() => {
    //     let promise
    //     if (isLoading) {
    //         console.log('aaa')
    //         promise = dispatch(fetchCategories())
    //         setTimeout(() => {

    //         }, 1200)
    //     }

    //     return () => {
    //         promise?.abort();
    //     }
    // }, [isLoading])

    return (
        <FilterLeft title='Danh mục'>
            <Grid
                col={1}
                gap={10}
            >
                {isLoading ? (
                    <Skeleton count={4} height={20} style={{ marginBottom: '10px' }} />
                ) :

                    categories?.map((item, index) => (

                        <SubCategoryFilter key={index} item={item} />

                    ))

                }

            </Grid>
        </FilterLeft >
    )
}

export default CategoryFilter



 // <div key={index} className='accordion'>
                        //     {/* <div className='custom-checkbox accordion-filter'>
                        //         <input type="checkbox" />
                        //         <span className="custom-checkbox__checkmark">
                        //             <BsCheckLg />
                        //         </span>
                        //         {item.display}
                        //     </div> */}
                        //     <div className="accordion__title ">
                        //         <CheckBox label={item.display} />
                        //         <span className='right__icon' onClick={handleClick}>
                        //             {/* <CloseIcon className={` right__icon__svg rotate`} /> */}
                        //             {show
                        //                 ? <SubtractIcon className='filter-left__icon__svg' />
                        //                 : <CloseIcon className={`filter-left__icon__svg rotate`} />
                        //             }
                        //         </span>
                        //     </div>
                        //     <div
                        //         // col={1}
                        //         ref={ref}
                        //         className={`accordion__content`}
                        //     >
                        //         <div className=" accordion__content__item">
                        //             <CheckBox label={item.display} />
                        //         </div>
                        //         <div className=" accordion__content__item">
                        //             <CheckBox label={item.display} />
                        //         </div>
                        //         <div className=" accordion__content__item">
                        //             <CheckBox label={item.display} />
                        //         </div>
                        //     </div>
                        // </div>