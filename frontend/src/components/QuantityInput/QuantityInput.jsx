import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { handleLazyLoadSvgPromise } from '../../utils'
const MinusIcon = React.lazy(() =>
  handleLazyLoadSvgPromise(import('../../assets/images/minus.svg'))
)
const PlusIcon = React.lazy(() =>
  handleLazyLoadSvgPromise(import('../../assets/images/plus.svg'))
)

const QuantityInput = (props) => {
  // const [quantity, setQuantity] = useState(props.initValue || 1)

  const incr = (incr = true) => {
    const quantity = props.quantity
    if ((Boolean(quantity) === false || quantity * 1 <= 1) && !incr) return
    if (props?.onChange) {
      return props.onChange(quantity * 1 + (incr ? 1 : -1))
    }
  }

  const handleChange = (e) => {
    if (e.target.value === '') return
    const s_number = e.target.value.replace(/^0*/g, '')
    console.log(e.target.value)
    if (s_number && s_number * 1 >= 1 && s_number < 1000) {
      props.onChange(s_number)
    }
  }
  // useEffect(() => {
  //   if (props?.onChange) {
  //     props.onChange(quantity * 1)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [quantity])

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
  quantity: PropTypes.number.isRequired
}

export default QuantityInput
