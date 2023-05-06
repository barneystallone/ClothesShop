import React, { Suspense } from 'react'
import PropTypes from 'prop-types'

const BiCheck = React.lazy(() =>
  import('react-icons/bi').then(({ BiCheck }) => ({ default: BiCheck }))
)
const CheckBox = (props) => {
  const inputRef = React.useRef(null)
  const className = props.className ? props.className : ''
  const onChange = (e) => {
    if (props.onChange) {
      props.onChange(inputRef.current)
    }
  }
  const onClick = (e) => {
    if (props.onClick) {
      props.onClick(inputRef.current)
    }
  }

  return (
    <>
      <label className={`custom-checkbox ${className}`}>
        <input
          type='checkbox'
          ref={inputRef}
          onChange={onChange}
          // onClick={onClick}
          checked={props.checked}
        />
        <Suspense fallback={<div>..</div>}>
          <span className='custom-checkbox__checkmark'>
            <BiCheck />
          </span>
        </Suspense>
        {props.label}
      </label>
    </>
  )
}

CheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  onClick: PropTypes.func
}

export default React.memo(CheckBox)
