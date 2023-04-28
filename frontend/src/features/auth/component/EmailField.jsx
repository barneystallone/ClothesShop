import classNames from 'classnames'
import React, { Suspense } from 'react'
const BiEnvelope = React.lazy(() =>
  import('react-icons/bi').then((module) => ({ default: module.BiEnvelope }))
)
const BiError = React.lazy(() =>
  import('react-icons/bi').then((module) => ({ default: module.BiError }))
)

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
        <Suspense fallback={<div>...</div>}>
          <BiError
            className={classNames('input__box__icon  ', {
              visible: !!error
            })}
          />
        </Suspense>
        <Suspense fallback={<div>...</div>}>
          <BiEnvelope className='input__box__icon input__box__icon--pre' />
        </Suspense>
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
