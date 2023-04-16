import React, { useCallback, useEffect, useState } from 'react'
import ProductView from './ProductView'
import { useSelector } from 'react-redux'
import { selectProductModalSlug } from '../app/product/productModal.slice'
import productData from '../assets/fake-data/products'
import { ReactComponent as CloseIcon } from '../assets/images/close.svg'
import useModal from '../hook/useModal'
const ProductViewModal = () => {
    const productSlug = useSelector(selectProductModalSlug);

    const beforeCloseModalCb = useCallback((e) => {
        console.log("element:::", e?.target.closest('.icon-wrap'));
        e?.target.closest('.product-view__modal').classList.add('active');
    }, [])
    const [isShow, closeModal] = useModal(beforeCloseModalCb);
    const [product, setProduct] = useState({});

    console.log('isShow:::', isShow);


    useEffect(() => {
        setProduct(productData.getProductBySlug(productSlug) || {})
    }, [productSlug])

    return (

        isShow ? (
            <div className="product-view__modal" onClick={closeModal} >
                <div className="product-view__modal__content" onClick={(e) => e.stopPropagation()}>
                    <div className='product-view__modal__content__header'>
                        <span className='title'>Thêm vào giỏ hàng</span>
                        <div className="icon-wrap" onClick={closeModal}>
                            <CloseIcon />
                        </div>
                    </div>
                    <ProductView product={product} modal />
                </div>

            </div>
        ) : (
            <></>
        )



    )
}


export default ProductViewModal