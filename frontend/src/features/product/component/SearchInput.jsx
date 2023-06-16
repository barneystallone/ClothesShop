import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { selectKeyword, setKeyword } from '../product.slice'
import { BiX } from 'react-icons/bi'
let count = 1
let delay
const SearchInput = (props) => {
  const keyword = useSelector(selectKeyword)
  const inputRef = useRef(null)
  const dispatch = useDispatch()
  // const inputRef = useRef(null)

  const resetInput = () => {
    dispatch(setKeyword(''))
    inputRef.current.focus()
  }
  useEffect(() => console.log(count++))
  useEffect(() => {
    const cssTransitionDelay = 200
    delay = setTimeout(() => inputRef.current?.focus(), cssTransitionDelay)
    return () => clearTimeout(delay)
  }, [])
  return (
    <>
      <input
        type='text'
        ref={inputRef}
        name='keyword'
        className='search__top__input'
        placeholder='Nhập từ khóa tìm kiếm ở đây'
        value={keyword}
        onChange={(e) => dispatch(setKeyword(e.target.value))}
      />
      <div className='search__top__icon search__top__icon--close' onClick={resetInput}>
        <BiX />
      </div>
    </>
  )
}

SearchInput.propTypes = {
  // keyword: PropTypes.string.isRequired
}

export default SearchInput
