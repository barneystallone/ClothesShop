import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { Suspense, useCallback, useMemo, useState } from 'react'

const BiError = React.lazy(() =>
  import('react-icons/bi').then((module) => ({ default: module.BiError }))
)
const BiShow = React.lazy(() =>
  import('react-icons/bi').then(({ BiShow }) => ({ default: BiShow }))
)
const BiHide = React.lazy(() =>
  import('react-icons/bi').then(({ BiHide }) => ({ default: BiHide }))
)
const BiLockAlt = React.lazy(() =>
  import('react-icons/bi').then(({ BiLockAlt }) => ({ default: BiLockAlt }))
)

const PasswordField = ({ className, placeholder, register, error }) => {
  const [show, setShow] = useState(false)

  const showHidePassword = useCallback(() => {
    setShow(!show)
  }, [show])

  const eyeIconStyled = useMemo(
    () => ({
      right: error ? '20px' : 0
    }),
    [error]
  )

  return (
    <div
      className={classNames(`fields ${className ?? ''}`, {
        error__field: !!error
      })}
    >
      <div className={`input__box ${className}`}>
        <input
          type={!show ? 'password' : 'text'}
          placeholder={placeholder}
          {...register}
        />
        <Suspense fallback={<div>...</div>}>
          <BiError
            className={classNames('input__box__icon  ', {
              visible: !!error
            })}
          />
          <BiLockAlt className='input__box__icon input__box__icon--pre' />
          <BiShow
            className={classNames('input__box__icon ', {
              visible: !show
            })}
            style={eyeIconStyled}
            onClick={showHidePassword}
          />
          <BiHide
            className={classNames('input__box__icon ', {
              visible: show
            })}
            style={eyeIconStyled}
            onClick={showHidePassword}
          />
        </Suspense>
      </div>
      <p className='color-red error__message'>{error?.message}</p>
    </div>
  )
}
PasswordField.propTypes = {
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

export default React.memo(PasswordField)
