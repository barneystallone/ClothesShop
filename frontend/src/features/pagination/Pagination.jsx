import React, { Fragment, Suspense, useCallback } from 'react'
import { usePagination } from '../../hook'
import classNames from 'classnames'
const BiChevronsLeft = React.lazy(() =>
  import('react-icons/bi').then(({ BiChevronsLeft }) => ({ default: BiChevronsLeft }))
)
const BiChevronLeft = React.lazy(() =>
  import('react-icons/bi').then(({ BiChevronLeft }) => ({ default: BiChevronLeft }))
)
const BiChevronRight = React.lazy(() =>
  import('react-icons/bi').then(({ BiChevronRight }) => ({ default: BiChevronRight }))
)
const BiChevronsRight = React.lazy(() =>
  import('react-icons/bi').then(({ BiChevronsRight }) => ({ default: BiChevronsRight }))
)
let count = 1
const Pagination = () => {
  // console.log('count::', count++)
  const range = useCallback(
    (start, stop) => Array.from({ length: stop - start }, (_, i) => start + i),
    []
  )
  const { navigateToPage, totalPage, activePage, start, end } = usePagination()

  return end !== 1 ? (
    <div className='pagination'>
      <div className='pagination__info'>
        <span>Trang {activePage} </span>
        <span>/ {totalPage}</span>
      </div>
      <ul className='pagination__list'>
        <li className='pagination__list__item  btn-group '>
          <Suspense fallback={<div>...</div>}>
            <div className='btn ' onClick={() => navigateToPage(1)}>
              <BiChevronsLeft />
            </div>
          </Suspense>
          <div className='btn  ' onClick={() => navigateToPage(activePage - 1)}>
            <Suspense fallback={<div>...</div>}>
              <BiChevronLeft />
            </Suspense>
          </div>
        </li>

        {start > 1 && <li className='pagination__list__item dots '>...</li>}
        {range(start, end + 1).map((value, index) => (
          <li
            key={index}
            onClick={() => navigateToPage(value)}
            className={classNames('pagination__list__item number ', {
              active: activePage == value
            })}
          >
            {value}
          </li>
        ))}
        {end < totalPage && <li className='pagination__list__item dots '>...</li>}
        <li className='pagination__list__item btn-group  '>
          <Suspense fallback={<div>...</div>}>
            <div className='btn ' onClick={() => navigateToPage(activePage + 1)}>
              <BiChevronRight />
            </div>
          </Suspense>
          <Suspense fallback={<div>...</div>}>
            <div className='btn  ' onClick={() => navigateToPage(totalPage)}>
              <BiChevronsRight />
            </div>
          </Suspense>
        </li>
      </ul>
    </div>
  ) : (
    <Fragment></Fragment>
  )
}

Pagination.propTypes = {}

export default React.memo(Pagination)
