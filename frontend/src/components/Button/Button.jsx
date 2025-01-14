import React from 'react'
import PropTypes from 'prop-types'

const Button = (props) => {
  const bg = props.backgroundColor ? `bg-${props.backgroundColor}` : 'bg-main'
  const size = props.size ? `btn-${props.size}` : ''
  const animate = props.animate ? `btn-animate` : ''
  return (
    <button
      className={`btn btn-slider ${size} ${animate} ${bg} ${props?.className}`}
      onClick={props.onClick ? props.onClick : null}
      type={props?.type || 'button'}
    >
      <span className='btn-txt'>{props.children}</span>
      {props.icon ? (
        <span className='btn-icon'>
          {typeof props.icon === 'string' ? <i className={props.icon}></i> : props.icon}
        </span>
      ) : null}
    </button>
  )
}

Button.propTypes = {
  backgroundColor: PropTypes.string,
  size: PropTypes.string,
  icon: PropTypes.element || PropTypes.string,
  animate: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string
}

export default React.memo(Button)
