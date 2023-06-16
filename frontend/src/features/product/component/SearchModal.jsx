import React, { useCallback, useEffect, useRef } from 'react'
import {
  selectSearchModalStatus,
  setKeyword,
  setShowSearchModalStatus
} from '../product.slice'
import useModal from '../../../hook/useModal'
import { useDispatch } from 'react-redux'
import AutoSuggestList from './AutoSuggestList'
import SearchProductList from './SearchProductList'
import { BiSearch, BiX } from 'react-icons/bi'
import SearchInput from './SearchInput'
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams
} from 'react-router-dom'
import { capitalizeWords } from '../../../utils'

const SearchModal = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const { show, closeModal } = useModal(
    setShowSearchModalStatus,
    selectSearchModalStatus,
    () => {
      searchRef.current?.classList.add('hide')
    },
    400
  )
  const searchRef = useRef(null)
  const onClickSuggest = useCallback(
    (suggest) => {
      dispatch(setKeyword(suggest))
    },
    [dispatch]
  )

  return show ? (
    <div className='overlay' onClick={closeModal} ref={searchRef}>
      <div
        className='search'
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className='search__floating__icon--close' onClick={closeModal}>
          <BiX />
        </div>
        <div className='search__icon--close' onClick={closeModal}>
          <BiX />
        </div>
        <form
          className='search__top'
          onSubmit={(e) => {
            e.preventDefault()
            let formData = new FormData(e.target)
            let keyword = Object.fromEntries(formData)['keyword'].trim()
            // console.log(Object.fromEntries(formData))
            if (pathname === '/product') {
              keyword
                ? searchParams.set('keyword', keyword)
                : searchParams.delete('keyword')
              setSearchParams(searchParams)
            } else {
              navigate({
                pathname: '/product',
                search: keyword
                  ? `?${createSearchParams({
                      keyword
                    })}`
                  : null
              })
            }
            closeModal()
          }}
        >
          <div className='search__top__icon search__top__icon--search'>
            <BiSearch />
          </div>
          <SearchInput />
        </form>
        <div className='search__result'>
          <AutoSuggestList onClickSuggest={onClickSuggest} />
          <SearchProductList onClickItem={closeModal} />
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  )
}

export default SearchModal
