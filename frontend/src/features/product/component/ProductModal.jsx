import React, { useCallback, Suspense } from 'react'
import ProductView from './ProductView'
import { useSelector } from 'react-redux'
import { removeProductModalSlug, selectShowModalStatus, selectProductModalSlug } from '../product.slice'
import useModal from '../../../hook/useModal'
import { useGetProductQuery } from '../product.service'
import { CloseIcon } from '../../../assets'

const ProductModal = () => {
  const productSlug = useSelector(selectProductModalSlug)

  const beforeCloseModalCb = useCallback((e) => {
    e?.target.closest('.product-view__modal').classList.add('active')
  }, [])

  const { show, closeModal } = useModal(removeProductModalSlug, selectShowModalStatus, beforeCloseModalCb)
  const { data } = useGetProductQuery(productSlug, {
    skip: !productSlug
  })
  // const [product, setProduct] = useState({})

  // useEffect(() => {
  //   setProduct(productData.getProductBySlug(productSlug) || {})
  // }, [productSlug])

  return show ? (
    <div className='product-view__modal' onClick={closeModal}>
      <div className='product-view__modal__content' onClick={(e) => e.stopPropagation()}>
        <div className='product-view__modal__content__header'>
          <span className='title'>Thêm vào giỏ hàng</span>
          <Suspense fallback={<div>...</div>}>
            <div className='icon-wrap' onClick={closeModal}>
              <CloseIcon />
            </div>
          </Suspense>
        </div>
        <ProductView product={data?.product} modal />
      </div>
    </div>
  ) : (
    <></>
  )
}

export default ProductModal
