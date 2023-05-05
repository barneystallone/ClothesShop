import React, { useRef, useState, Suspense } from 'react'
import PropTypes from 'prop-types'
import { handleLazyLoadSvgPromise } from '../../../utils'
const CloseIcon = React.lazy(() =>
  handleLazyLoadSvgPromise(import('../../../assets/images/close.svg'))
)
const SubtractIcon = React.lazy(() =>
  handleLazyLoadSvgPromise(import('../../../assets/images/subtract.svg'))
)
const FilterLeft = (props) => {
  const [show, setShow] = useState(true)

  const ref = useRef(null)

  const handleClick = () => {
    const elm = ref.current.closest('.filter-left__content')

    setShow(!show)
    elm.style.height = !show ? `${ref.current.offsetHeight}px` : 0
  }

  return (
    <div className='filter-left'>
      <div className='filter-left__title'>
        <span>{props.title}</span>
        <Suspense fallback={<div>...</div>}>
          <span className='filter-left__icon' onClick={handleClick}>
            {show ? (
              <SubtractIcon className='filter-left__icon__svg' />
            ) : (
              <CloseIcon className={`filter-left__icon__svg rotate`} />
            )}
          </span>
        </Suspense>
      </div>
      <div className='filter-left__content'>
        <div ref={ref}>{props.children}</div>
      </div>
    </div>
  )
}

FilterLeft.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element,
  // data: PropTypes.array.isRequired,
  nested: PropTypes.bool
}
export default React.memo(FilterLeft)
