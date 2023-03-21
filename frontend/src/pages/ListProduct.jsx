import React from 'react'
import productData from '../assets/fake-data/products'
import Helmet from '../components/Helmet'
import category from '../assets/fake-data/category'
import CheckBox from '../components/Checkbox'
import size from '../assets/fake-data/product-size'
import InfinityList from '../features/product/InfinityList'
const ListProduct = () => {
  const products = productData.getAllProducts();
  return (
    <Helmet title='Sản phẩm'>
      <div className="product">
        <div className="product-filter">
          <div className="product-filter__widget">
            <div className="product-filter__widget__title">
              Danh mục sản phẩm
            </div>
            <div className="product-filter__widget__content">
              {
                category.map((item, index) => (
                  <div key={index} className="product-filter__widget__content__item">
                    <CheckBox
                      label={item.display}
                    />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="product-filter__widget">
            <div className="product-filter__widget__title">
              Kích cỡ
            </div>
            <div className="product-filter__widget__content">
              {
                size.map((item, index) => (
                  <div key={index} className="product-filter__widget__content__item">
                    <CheckBox
                      label={item.display}
                    />
                  </div>
                ))
              }
            </div>
          </div>

        </div>
        <div className="product-content">
          {/* <Grid
            col={4}
            mdCol={2}
            smCol={1}
            gap={24}
          >
            {
              productData.getAllProducts().map((item,index) => (
                <ProductCard
                  categorySlug={item.categorySlug}
                  key={index}
                  title={item.title}
                  colors={item.colors}
                  price={Number(item.price)}
                  slug= {item.slug}
                  productId= {item.productId}
                  sale= {Number(item.sale)}
                >

                </ProductCard>
              ))
            }

          </Grid> */}
          <InfinityList
            data={products}
          />
        </div>
      </div>

    </Helmet>
  )
}

export default ListProduct