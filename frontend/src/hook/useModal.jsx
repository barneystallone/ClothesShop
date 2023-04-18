import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const useModal = (action, showStatusSelector, callback, delay = 200) => {
  const isShow = useSelector(showStatusSelector)
  const dispatch = useDispatch()
  const [show, setShow] = useState(isShow)
  const [event, setEvent] = useState(null)
  // const [payload, setPayload] = useState(false);

  const closeModal = (e, payload) => {
    setEvent(e)
    dispatch(action(payload))
  }
  // Tạo hiệu ứng, sau 1 khoảng delay mới unmount
  useEffect(() => {
    if (!isShow) {
      // Animation
      if (callback) {
        callback && callback(event)
        const id = setTimeout(() => {
          setShow(false)
        }, delay)

        return () => clearTimeout(id)
      }
      setShow(false)
      return
    }
    setShow(true)
  }, [isShow])
  return {
    show,
    closeModal
  }
  // const closeModal = (e, payload) => {
  //     setEvent(e);
  //     setPayload(payload);

  //     setShow(false);
  // }
  // // useEffect(() => {
  // //     console.log('show:::', show);
  // //     setShow(isShow);
  // // }, [isShow])

  // useEffect(() => {
  //     console.log("isShow::",isShow);
  //     if (!show && isShow) {
  //         console.log('effect:::', show);
  //         // Animation
  //         if (callback) {
  //             callback && callback(event);
  //             const id = setTimeout(() => {
  //                 dispatch(action(payload))
  //             }, delay)

  //             return () => clearTimeout(id)
  //         } else {
  //             dispatch(action(payload));
  //             // dispatch(action());
  //         }
  //     }
  // }, [show])

  // return {
  //     isShow,
  //     closeModal,
  // };
}

export default useModal
