import React, { useCallback, Suspense, useMemo } from 'react'
import ProductView from './ProductView'
import { useSelector } from 'react-redux'
import {
  closeProductModal,
  selectShowModalStatus,
  selectProductModalSlug,
  selectProductModalType
} from '../product.slice'
import { useModal } from '../../../hook'
import { useGetProductQuery } from '../product.service'
import { handleLazyLoadSvgPromise } from '../../../utils'
const CloseIcon = React.lazy(() =>
  handleLazyLoadSvgPromise(import('../../../assets/images/close.svg'))
)

const ProductModal = () => {
  const productSlug = useSelector(selectProductModalSlug)
  const isTypeUpdateModal = useSelector(selectProductModalType)

  const beforeCloseModalCb = useCallback((e) => {
    e?.target.closest('.product-view__modal').classList.add('active')
  }, [])

  const { show, closeModal } = useModal(
    closeProductModal,
    selectShowModalStatus,
    beforeCloseModalCb
  )

  // khi tắt bật mới đổi
  const title = useMemo(() => {
    return isTypeUpdateModal ? 'Cập nhật giỏ hàng' : 'Thêm vào giỏ hàng'
  }, [show])

  const { data, isFetching } = useGetProductQuery(productSlug, {
    skip: !productSlug
  })

  return show ? (
    <div className='product-view__modal' onClick={closeModal}>
      <div className='product-view__modal__content' onClick={(e) => e.stopPropagation()}>
        <div className='product-view__modal__content__header'>
          <span className='title'>{title}</span>
          <Suspense fallback={<div>...</div>}>
            <div className='icon-wrap' onClick={closeModal}>
              <CloseIcon />
            </div>
          </Suspense>
        </div>
        <ProductView
          loading={isFetching}
          product={data?.product}
          modal
          closeModal={closeModal}
          textContentBtnUpdate={title}
        />
      </div>
    </div>
  ) : (
    <></>
  )
}

export default ProductModal
