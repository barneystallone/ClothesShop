import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Grid from '../../../components/Grid'
import { useLazySearchProductsQuery } from '../product.service'
import { numberToCurrency } from '../../../utils'
import { Link } from 'react-router-dom'
const SearchProductList = (props) => {
  const { capitalKeyword, onClickItem } = props
  const [trigger, { data }] = useLazySearchProductsQuery()

  useEffect(() => {
    let controller
    if (capitalKeyword.length >= 2) {
      controller = trigger({ keyword: capitalKeyword })
    }

    return () => {
      controller?.abort()
    }
  }, [capitalKeyword, trigger])

  return (
    <div className='search__result__product'>
      <h2 className='search__result__product__title'>
        Sản phẩm<span className='result__count'>({data?.total ?? 0})</span>
      </h2>
      <div className='search__result__product__section'>
        <Grid col={2} mdCol={1} gap={10}>
          {data?.products.length && capitalKeyword.length >= 2 ? (
            data.products.map((item) => (
              <Link
                key={item.pId}
                to={`product/${item.slug}`}
                onClick={(e) => {
                  onClickItem(e)
                }}
              >
                <div className='product-preview  '>
                  <div className='product-preview__left'>
                    <div className='image-wrap'>
                      <img loading='lazy' src={item.url} alt={item.title} />
                    </div>
                  </div>
                  <div className='product-preview__right'>
                    <div
                      className='product-preview__right__title'
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    ></div>
                    <div className='product-preview__right__price'>
                      {numberToCurrency(item.price)} VND
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div>Không tìm thấy sản phẩm nào</div>
          )}
        </Grid>
      </div>
    </div>
  )
}

SearchProductList.propTypes = {
  capitalKeyword: PropTypes.string.isRequired,
  onClickItem: PropTypes.func
}

export default React.memo(SearchProductList)
