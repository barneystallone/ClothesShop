import classNames from 'classnames'
import React from 'react'
import { HiOutlineEnvelope } from 'react-icons/hi2'
import { RiErrorWarningFill } from 'react-icons/ri'
import PropTypes from 'prop-types'
const EmailField = ({ className, placeholder, register, error }) => {
  return (
    <div
      className={classNames(`fields ${className ?? ''}`, {
        error__field: !!error
      })}
    >
      <div className={`input__box `}>
        <input type='text' placeholder={placeholder} {...register} />
        <RiErrorWarningFill
          className={classNames('input__box__icon  ', {
            visible: !!error
          })}
        />
        <HiOutlineEnvelope className='input__box__icon input__box__icon--pre' />
      </div>
      <p className='color-red error__message'>{error?.message}</p>
    </div>
  )
}
EmailField.propTypes = {
  className: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,

  register: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string
  }).isRequired,

  error: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string,
    input: PropTypes.shape({ current: PropTypes.any })
  })
}
export default React.memo(EmailField)
