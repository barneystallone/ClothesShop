import React, { useCallback, useEffect, useRef } from 'react'
import {
  selectCapitalizeKeyword,
  selectKeyword,
  selectSearchModalStatus,
  setKeyword,
  setShowSearchModalStatus
} from '../product.slice'
import useModal from '../../../hook/useModal'
import { useDispatch, useSelector } from 'react-redux'
import AutoSuggestList from './AutoSuggestList'
import SearchProductList from './SearchProductList'
import { BiSearch, BiX } from 'react-icons/bi'

const SearchModal = () => {
  const dispatch = useDispatch()
  const keyword = useSelector(selectKeyword)
  const capitalKeyword = useSelector(selectCapitalizeKeyword)
  const { show, closeModal } = useModal(
    setShowSearchModalStatus,
    selectSearchModalStatus,
    () => {
      searchRef.current?.classList.add('hide')
    },
    400
  )
  const inputRef = useRef(null)
  const searchRef = useRef(null)
  const onClickSuggest = useCallback(
    (suggest) => {
      dispatch(setKeyword(suggest))
    },
    [dispatch]
  )

  const resetInput = () => {
    dispatch(setKeyword(''))
    inputRef.current.focus()
  }

  useEffect(() => {
    if (show) {
      inputRef.current.focus()
    }
  }, [show])
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
            console.log(Object.fromEntries(formData))
          }}
        >
          <div className='search__top__icon search__top__icon--search'>
            <BiSearch />
          </div>

          <input
            type='text'
            ref={inputRef}
            name='keyword'
            className='search__top__input'
            placeholder='Nhập từ khóa tìm kiếm ở đây'
            value={keyword}
            onChange={(e) => dispatch(setKeyword(e.target.value))}
          />
          <div
            className='search__top__icon search__top__icon--close'
            onClick={resetInput}
          >
            <BiX />
          </div>
        </form>
        <div className='search__result'>
          <AutoSuggestList
            capitalKeyword={capitalKeyword}
            onClickSuggest={onClickSuggest}
          />
          <SearchProductList capitalKeyword={capitalKeyword} onClickItem={closeModal} />
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  )
}

export default SearchModal
