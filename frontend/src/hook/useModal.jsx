import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const useModal = (closeModalAction, showStatusSelector, callback, delay = 200) => {
  const isShow = useSelector(showStatusSelector)
  const dispatch = useDispatch()
  const [show, setShow] = useState(isShow)
  const [event, setEvent] = useState(null)

  const closeModal = (e) => {
    setEvent(e)
    dispatch(closeModalAction(false))
  }
  // Tạo hiệu ứng, sau 1 khoảng delay mới unmount
  useEffect(() => {
    // console.log(isShow)
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
  }, [isShow, callback, delay, event])
  return {
    show,
    closeModal
  }
}

export default useModal
