import React, { Suspense } from 'react'

const BiSearch = React.lazy(() =>
  import('react-icons/bi').then(({ BiSearch }) => ({ default: BiSearch }))
)
const BiSearchAlt = React.lazy(() =>
  import('react-icons/bi').then(({ BiSearchAlt }) => ({ default: BiSearchAlt }))
)
const BiX = React.lazy(() =>
  import('react-icons/bi').then(({ BiX }) => ({ default: BiX }))
)

const SearchModal = () => {
  return (
    <div className='overlay'>
      <Suspense>
        <div className='search'>
          <div className='search__top'>
            <div className='search__top__icon search__top__icon--search'>
              <BiSearch />
            </div>

            <input
              type='text'
              className='search__top__input'
              placeholder='Nhập từ khóa tìm kiếm ở đây'
            />
            <div className='search__top__icon search__top__icon--close'>
              <BiX />
            </div>
          </div>
          <div className='search__result'>
            <div className='search__result__suggest'>
              <h2 className='search__result__suggest__title'>Gợi ý</h2>
              <div className='search__result__suggest__section'>
                <div className='item-group'>
                  <div className='item-group__icon'>
                    <BiSearchAlt />
                  </div>
                  <div className='item-group__content'>Áo sơ mi nam tay ngắn cổ</div>
                </div>
                <div className='item-group'>
                  <div className='item-group__icon'>
                    <BiSearchAlt />
                  </div>
                  <div className='item-group__content'>Áo sơ mi nam tay ngắn cổ</div>
                </div>
                <div className='item-group'>
                  <div className='item-group__icon'>
                    <BiSearchAlt />
                  </div>
                  <div className='item-group__content'>Áo sơ mi nam tay ngắn cổ</div>
                </div>
              </div>
            </div>
            <div className='search__result__suggest'>
              <h2 className='search__result__suggest__title'>Gợi ý</h2>
              <div className='search__result__suggest__section'>
                <div className='item-group'>
                  <div className='item-group__icon'>
                    <BiSearch />
                  </div>
                  <div className='item-group__content'>Áo sơ mi nam tay ngắn cổ</div>
                </div>
                <div className='item-group'>
                  <div className='item-group__icon'>
                    <BiSearch />
                  </div>
                  <div className='item-group__content'>Áo sơ mi nam tay ngắn cổ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  )
}

export default SearchModal
