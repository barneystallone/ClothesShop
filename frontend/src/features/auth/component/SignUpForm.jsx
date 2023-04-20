import React, { forwardRef, useEffect } from 'react'
import PasswordField from './PasswordField'
import EmailField from './EmailField'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import Button from '../../../components/Button'
import classNames from 'classnames'
import PropTypes from 'prop-types'
const SignUpForm = forwardRef(({ onSubmit, showLogin, navigate: toLogin, resolver, updateHeight }, ref) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    resolver: resolver
  })

  useEffect(() => {
    updateHeight()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!errors.email, !!errors.password, !!errors.confirmPasswordy])

  return (
    <div
      ref={ref}
      className={classNames('form signup-form', {
        active: !showLogin
      })}
      onClick={(e) => e.stopPropagation()}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Đăng ký</h2>
        <EmailField
          className='email '
          placeholder='acb@gmail.com'
          register={{ ...register('email') }}
          error={errors.email}
        />
        <PasswordField
          className='password '
          placeholder='Mật khẩu'
          register={{ ...register('password') }}
          error={errors.password}
        />

        <PasswordField
          className='confirm-password '
          placeholder='Nhập lại mật khẩu'
          register={{
            ...register('confirmPassword')
          }}
          error={errors.confirmPassword}
        />

        <Button type='submit' className='submit-btn'>
          Đăng ký ngay
        </Button>

        <div className='login-signup'>
          Đã có tài khoản? <span onClick={toLogin}>Quay lại đăng ký</span>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  )
})

SignUpForm.displayName = 'SignUpForm'

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  showLogin: PropTypes.bool.isRequired,
  navigate: PropTypes.func.isRequired,
  resolver: PropTypes.func.isRequired,
  updateHeight: PropTypes.func.isRequired
}

export default React.memo(SignUpForm)
