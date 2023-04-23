import React, { useEffect, useState } from 'react'
import { removeProductSlug, selectModalStatus } from '../app/product/productModal.slice'
import { useDispatch, useSelector } from 'react-redux'
const useModal = (callback, delay = 200) => {
    const isShow = useSelector(selectModalStatus);
    const dispatch = useDispatch();
    const [show, setShow] = useState(isShow);
    const [event, setEvent] = useState(null);

    const closeModal = (e) => {
        setEvent(e);
        setShow(false);
    }
    useEffect(() => {
        if (!show) {
            callback && callback(event);
            const id = setTimeout(() => {
                dispatch(removeProductSlug())
            }, delay)

            return () => clearTimeout(id)
        }
    }, [show])

    useEffect(() => {
        setShow(isShow);
    }, [isShow])

    return [isShow, closeModal];
}


export default useModal