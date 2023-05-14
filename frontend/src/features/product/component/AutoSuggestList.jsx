import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSearchAutoSuggestQuery } from '../product.service'

import { BiSearchAlt } from 'react-icons/bi'
const AutoSuggestList = (props) => {
  const { capitalKeyword, onClickSuggest } = props
  const { data } = useSearchAutoSuggestQuery(
    { keyword: capitalKeyword },
    {
      skip: capitalKeyword.length < 1
    }
  )

  return (
    <div className='search__result__suggest'>
      <h2 className='search__result__suggest__title'>
        Gợi ý
        <span className='result__count'>
          ({data && capitalKeyword !== '' ? data.listSuggest.length : 0})
        </span>
      </h2>
      <div className='search__result__suggest__section'>
        {data?.listSuggest.length && capitalKeyword !== '' ? (
          data.listSuggest.map((suggest, index) => (
            <div
              className='item-group'
              key={index}
              onClick={() => onClickSuggest && onClickSuggest(suggest)}
            >
              <div className='item-group__icon'>
                <BiSearchAlt />
              </div>
              <div className='item-group__content'>{suggest}</div>
            </div>
          ))
        ) : (
          <div>Không tìm thấy gợi ý nào</div>
        )}
      </div>
    </div>
  )
}

AutoSuggestList.propTypes = {
  capitalKeyword: PropTypes.string.isRequired,
  onClickSuggest: PropTypes.func
}

export default React.memo(AutoSuggestList)
