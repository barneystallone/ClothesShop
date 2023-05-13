import React, { Suspense } from 'react'

import Grid from '../../components/Grid'

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
          <div className='search__floating__icon--close'>
            <BiX />
          </div>
          <div className='search__icon--close'>
            <BiX />
          </div>
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
              <h2 className='search__result__suggest__title'>
                Gợi ý<span className='result__count'>(2)</span>
              </h2>
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
                  <div className='item-group__content'>
                    Áo Áo Áo Áo Áo Áo Áo sơ mi nam tay ngắn cổ
                  </div>
                </div>
                <div className='item-group'>
                  <div className='item-group__icon'>
                    <BiSearchAlt />
                  </div>
                  <div className='item-group__content'>
                    Áo Áo Áo Áo Áo Áo Áo sơ mi nam tay ngắn cổ
                  </div>
                </div>
                <div className='item-group'>
                  <div className='item-group__icon'>
                    <BiSearchAlt />
                  </div>
                  <div className='item-group__content'>
                    Áo Áo Áo Áo Áo Áo Áo sơ mi nam tay ngắn cổ
                  </div>
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
                <div className='item-group'>
                  <div className='item-group__icon'>
                    <BiSearchAlt />
                  </div>
                  <div className='item-group__content'>Áo sơ mi nam tay ngắn cổ</div>
                </div>
              </div>
            </div>
            <div className='search__result__product'>
              <h2 className='search__result__product__title'>
                Sản phẩm<span className='result__count'>(2)</span>
              </h2>
              <div className='search__result__product__section'>
                <Grid col={2} mdCol={1} gap={10}>
                  <div className='product-preview  '>
                    <div className='product-preview__left'>
                      <div className='image-wrap'>
                        <img
                          src='https://res.cloudinary.com/dup598xiv/image/upload/v1682306541/clothesShop/product/wa1b3kh10zqouaoh32br.jpg'
                          alt='ảnh'
                        />
                      </div>
                    </div>
                    <div className='product-preview__right'>
                      <div className='product-preview__right__title'>
                        Áo Cadigan Sát Nách Lai Nhọn Playgirl
                      </div>
                      <div className='product-preview__right__price'>89.250 VND</div>
                    </div>
                  </div>
                  <div className='product-preview  '>
                    <div className='product-preview__left'>
                      <div className='image-wrap'>
                        <img
                          src='https://res.cloudinary.com/dup598xiv/image/upload/v1682306541/clothesShop/product/wa1b3kh10zqouaoh32br.jpg'
                          alt='ảnh'
                        />
                      </div>
                    </div>
                    <div className='product-preview__right'>
                      <div className='product-preview__right__title'>
                        Áo Cadigan Sát Nách Lai Nhọn Playgirl
                      </div>
                      <div className='product-preview__right__price'>89.250 VND</div>
                    </div>
                  </div>
                  <div className='product-preview  '>
                    <div className='product-preview__left'>
                      <div className='image-wrap'>
                        <img
                          src='https://res.cloudinary.com/dup598xiv/image/upload/v1682306541/clothesShop/product/wa1b3kh10zqouaoh32br.jpg'
                          alt='ảnh'
                        />
                      </div>
                    </div>
                    <div className='product-preview__right'>
                      <div className='product-preview__right__title'>
                        Áo Cadigan Sát Nách Lai Nhọn Playgrsssssss ssssrrl Playgi Playgirl
                      </div>
                      <div className='product-preview__right__price'>89.250 VND</div>
                    </div>
                  </div>
                  <div className='product-preview  '>
                    <div className='product-preview__left'>
                      <div className='image-wrap'>
                        <img
                          src='https://res.cloudinary.com/dup598xiv/image/upload/v1682306541/clothesShop/product/wa1b3kh10zqouaoh32br.jpg'
                          alt='ảnh'
                        />
                      </div>
                    </div>
                    <div className='product-preview__right'>
                      <div className='product-preview__right__title'>
                        Áo Cadigan Sát Nách Lai Nhọn Playgrsssssss ssssrrl Playgi Playgirl
                      </div>
                      <div className='product-preview__right__price'>89.250 VND</div>
                    </div>
                  </div>
                  <div className='product-preview  '>
                    <div className='product-preview__left'>
                      <div className='image-wrap'>
                        <img
                          src='https://res.cloudinary.com/dup598xiv/image/upload/v1682306541/clothesShop/product/wa1b3kh10zqouaoh32br.jpg'
                          alt='ảnh'
                        />
                      </div>
                    </div>
                    <div className='product-preview__right'>
                      <div className='product-preview__right__title'>
                        Áo Cadigan Sát Nách Lai Nhọn Playgrsssssss ssssrrl Playgi Playgirl
                      </div>
                      <div className='product-preview__right__price'>89.250 VND</div>
                    </div>
                  </div>
                  <div className='product-preview  '>
                    <div className='product-preview__left'>
                      <div className='image-wrap'>
                        <img
                          src='https://res.cloudinary.com/dup598xiv/image/upload/v1682306541/clothesShop/product/wa1b3kh10zqouaoh32br.jpg'
                          alt='ảnh'
                        />
                      </div>
                    </div>
                    <div className='product-preview__right'>
                      <div className='product-preview__right__title'>
                        Áo Cadigan Sát Nách Lai Nhọn Playgrsssssss ssssrrl Playgi Playgirl
                      </div>
                      <div className='product-preview__right__price'>89.250 VND</div>
                    </div>
                  </div>
                  <div className='product-preview  '>
                    <div className='product-preview__left'>
                      <div className='image-wrap'>
                        <img
                          src='https://res.cloudinary.com/dup598xiv/image/upload/v1682306541/clothesShop/product/wa1b3kh10zqouaoh32br.jpg'
                          alt='ảnh'
                        />
                      </div>
                    </div>
                    <div className='product-preview__right'>
                      <div className='product-preview__right__title'>
                        Áo Cadigan Sát Nách Lai Nhọn Playgrsssssss ssssrrl Playgi Playgirl
                      </div>
                      <div className='product-preview__right__price'>89.250 VND</div>
                    </div>
                  </div>
                  <div className='product-preview  '>
                    <div className='product-preview__left'>
                      <div className='image-wrap'>
                        <img
                          src='https://res.cloudinary.com/dup598xiv/image/upload/v1682306541/clothesShop/product/wa1b3kh10zqouaoh32br.jpg'
                          alt='ảnh'
                        />
                      </div>
                    </div>
                    <div className='product-preview__right'>
                      <div className='product-preview__right__title'>
                        Áo Cadigan Sát Nách Lai Nhọn Playgrsssssss ssssrrl Playgi Playgirl
                      </div>
                      <div className='product-preview__right__price'>89.250 VND</div>
                    </div>
                  </div>
                  <div className='product-preview  '>
                    <div className='product-preview__left'>
                      <div className='image-wrap'>
                        <img
                          src='https://res.cloudinary.com/dup598xiv/image/upload/v1682306541/clothesShop/product/wa1b3kh10zqouaoh32br.jpg'
                          alt='ảnh'
                        />
                      </div>
                    </div>
                    <div className='product-preview__right'>
                      <div className='product-preview__right__title'>
                        Áo Cadigan Sát Nách Lai Nhọn Playgrsssssss ssssrrl Playgi Playgirl
                      </div>
                      <div className='product-preview__right__price'>89.250 VND</div>
                    </div>
                  </div>
                  <div className='product-preview  '>
                    <div className='product-preview__left'>
                      <div className='image-wrap'>
                        <img
                          src='https://res.cloudinary.com/dup598xiv/image/upload/v1682306541/clothesShop/product/wa1b3kh10zqouaoh32br.jpg'
                          alt='ảnh'
                        />
                      </div>
                    </div>
                    <div className='product-preview__right'>
                      <div className='product-preview__right__title'>
                        Áo Cadigan Sát Nách Lai Nhọn Playgrsssssss ssssrrl Playgi Playgirl
                      </div>
                      <div className='product-preview__right__price'>89.250 VND</div>
                    </div>
                  </div>
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  )
}

export default SearchModal
