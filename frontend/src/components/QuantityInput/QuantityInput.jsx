import React, { Suspense, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { handleLazyLoadSvgPromise } from '../../utils'
const MinusIcon = React.lazy(() =>
  handleLazyLoadSvgPromise(import('../../assets/images/minus.svg'))
)
const PlusIcon = React.lazy(() =>
  handleLazyLoadSvgPromise(import('../../assets/images/plus.svg'))
)

let delay
const QuantityInput = (props) => {
  const [isFetching, setIsFetching] = useState(false)
  const isUnmountedRef = useRef(null)

  const incr = (incr = true) => {
    const quantity = props.quantity
    if ((Boolean(quantity) === false || quantity * 1 <= 1) && !incr) return
    setIsFetching(true)
    return props.onChange(quantity * 1 + (incr ? 1 : -1))
  }

  const handleChange = (e) => {
    if (e.target.value === '') return
    const s_number = e.target.value.replace(/^0*/g, '')
    if (s_number && s_number * 1 >= 1 && s_number < 1000) {
      setIsFetching(true)
      props.onChange(s_number)
    }
  }

  useEffect(() => {
    isUnmountedRef.current = false
    return () => {
      isUnmountedRef.current = true
    }
  }, [])

  useEffect(() => {
    if (props.onChangeSyncDb && isFetching) {
      delay = setTimeout(() => {
        props.onChangeSyncDb(props.quantity)
        setIsFetching(false)
      }, 1000)
    }

    return () => {
      clearTimeout(delay)
      if (isUnmountedRef.current && isFetching && props.onChangeSyncDb) {
        props.onChangeSyncDb(props.quantity)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.quantity])

  return (
    <Suspense fallback={<div>...</div>}>
      <div className={`${props.className} wrap-quantity`}>
        <div className='wrap-quantity__btn btn-minus ' onClick={() => incr(false)}>
          <MinusIcon className='icon minus-icon' />
        </div>
        <input
          className='wrap-quantity__input color-blue'
          type='number'
          value={props.quantity?.toString() || 1}
          onChange={handleChange}
        />
        <div className='wrap-quantity__btn btn-plus' onClick={() => incr()}>
          <PlusIcon className='icon plus-icon' />
        </div>
      </div>
    </Suspense>
  )
}

QuantityInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onChangeSyncDb: PropTypes.func,
  quantity: PropTypes.number.isRequired
}

export default QuantityInput
