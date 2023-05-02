import React, { Suspense, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { handleLazyLoadSvgPromise } from '../../utils'
const MinusIcon = React.lazy(() =>
  handleLazyLoadSvgPromise(import('../../assets/images/minus.svg'))
)
const PlusIcon = React.lazy(() =>
  handleLazyLoadSvgPromise(import('../../assets/images/plus.svg'))
)

const QuantityInput = React.forwardRef((props, ref) => {
  const [quantity, setQuantity] = useState(props.initValue || 1)

  const incr = (negative = false) => {
    if ((Boolean(quantity) === false || quantity * 1 <= 1) && negative) return
    setQuantity(quantity * 1 + (negative ? -1 : 1))
  }

  useEffect(() => {
    if (props?.onChange) {
      props.onChange(quantity * 1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity])

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
          value={quantity}
          onChange={(e) => {
            if (e.target.value === '') return
            const s_number = e.target.value.replace(/^0*/g, '')
            if (s_number && s_number * 1 >= 1 && s_number < 1000) setQuantity(s_number)
          }}
        />
        <div className='wrap-quantity__btn btn-plus' onClick={() => incr()}>
          <PlusIcon className='icon plus-icon' />
        </div>
      </div>
    </Suspense>
  )
})
QuantityInput.displayName = 'QuantityInput'

QuantityInput.propTypes = {
  className: PropTypes.string,
  initValue: PropTypes.number,
  onChange: PropTypes.func
}

export default QuantityInput
