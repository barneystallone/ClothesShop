import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  selecTotalPage,
  selectActivePage,
  setActivePage
} from '../features/pagination/pagination.slice'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
let count = 1

/**
 * start, end : Dùng để render ra các nút số ở thanh phân trang
 *
 */
const usePagination = () => {
  const [searchParams, setSeachParams] = useSearchParams()
  const totalPage = useSelector(selecTotalPage)
  const [start, setStart] = useState(1)
  const [end, setEnd] = useState(totalPage)
  const dispatch = useDispatch()
  const activePage = useSelector(selectActivePage)

  const setRangeOnChangePage = useCallback(
    (page) => {
      if (page <= 3) {
        setStart(1)
        setEnd(Math.min(5, totalPage))
        return
      }
      setEnd(Math.min(page + 2, totalPage))
      if (page > totalPage - 3) {
        setStart(Math.max(1, totalPage - 4))
        return
      }
      setStart(Math.max(1, page - 2))
    },
    [totalPage]
  )

  // init start, end để render Pagination number
  useEffect(() => {
    const page = Number(searchParams.get('page')) || 1
    if (page && page >= 1) setRangeOnChangePage(page)
  }, [totalPage])

  useEffect(() => {
    // dispatch(setActivePage(Number(searchPageParams) || 1))
    // setRangeOnChangePage(Number(searchPageParams))
  }, [])

  const navigateToPage = useCallback(
    (page) => {
      page = Math.max(page, 1)
      page = Math.min(page, totalPage)
      if (Number(searchParams.get('page')) !== page) {
        searchParams.set('page', page)
        setSeachParams(searchParams)

        dispatch(setActivePage(page))

        setRangeOnChangePage(page)
      }
    },
    [totalPage, setRangeOnChangePage]
  )

  return {
    navigateToPage,
    start,
    end,
    activePage,
    totalPage
  }
}

export default usePagination
