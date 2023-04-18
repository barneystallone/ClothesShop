import React, { useCallback, useEffect, useState } from 'react'
import ProductView from './ProductView'
import { useSelector } from 'react-redux'
import { removeProductSlug, selectShowModalStatus, selectProductModalSlug } from '../app/product/productModal.slice'
import productData from '../assets/fake-data/products'
import { ReactComponent as CloseIcon } from '../assets/images/close.svg'
import useModal from '../hook/useModal'
const ProductViewModal = () => {
  const productSlug = useSelector(selectProductModalSlug)

  const beforeCloseModalCb = useCallback((e) => {
    e?.target.closest('.product-view__modal').classList.add('active')
  }, [])

  const { show, closeModal } = useModal(removeProductSlug, selectShowModalStatus, beforeCloseModalCb)

  const [product, setProduct] = useState({})

  useEffect(() => {
    setProduct(productData.getProductBySlug(productSlug) || {})
  }, [productSlug])

  return show ? (
    <div className='product-view__modal' onClick={closeModal}>
      <div className='product-view__modal__content' onClick={(e) => e.stopPropagation()}>
        <div className='product-view__modal__content__header'>
          <span className='title'>Thêm vào giỏ hàng</span>
          <div className='icon-wrap' onClick={closeModal}>
            <CloseIcon />
          </div>
        </div>
        <ProductView product={product} modal />
      </div>
    </div>
  ) : (
    <></>
  )
}

export default ProductViewModal
