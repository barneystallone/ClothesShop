import React, { Suspense, useRef } from 'react'
import PropTypes from 'prop-types'
import { handleLazyLoadSvgPromise } from '../utils'
const MinusIcon = React.lazy(() => handleLazyLoadSvgPromise(import('../assets/images/minus.svg')))
const PlusIcon = React.lazy(() => handleLazyLoadSvgPromise(import('../assets/images/plus.svg')))
const QuantityInput = (props) => {
  const ref = useRef(null)

  const incr = (negative = false) => {
    // let value = ref.current.value * 1;'
    // console.log(ref.current.value == false);
    if ((Boolean(ref.current.value) === false || ref.current.value * 1 <= 1) && negative) return
    ref.current.value = ref.current.value * 1 + (negative ? -1 : 1)
  }

  return (
    <Suspense fallback={<div>...</div>}>
      <div className={`${props.className} wrap-quantity`}>
        <div className='wrap-quantity__btn btn-minus ' onClick={() => incr(true)}>
          <MinusIcon className='icon minus-icon' />
        </div>
        <input
          ref={ref}
          className='wrap-quantity__input color-blue'
          type='number'
          value={1}
          onChange={(e) => {
            console.log(e.target.value)
          }}
        />
        <div className='wrap-quantity__btn btn-plus' onClick={() => incr()}>
          <PlusIcon className='icon plus-icon' />
        </div>
      </div>
    </Suspense>
  )
}

QuantityInput.propTypes = {
  className: PropTypes.string
}

export default QuantityInput
