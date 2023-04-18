import React, { forwardRef, useEffect } from 'react'
import EmailField from './EmailField'
import PasswordField from './PasswordField'
import Button from '../../Button'
import { DevTool } from '@hookform/devtools'
import Checkbox from '../../Checkbox'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'

const LoginForm = forwardRef(({ onSubmit, showLogin, navigate: toSignUp, resolver, updateHeight }, ref) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: resolver
  })

  useEffect(() => {
    updateHeight()
  }, [!!errors.email, !!errors.password])

  return (
    <div
      className={classNames('form login-form', {
        active: !showLogin
      })}
      ref={ref}
      onClick={(e) => e.stopPropagation()}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Đăng nhập</h2>
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
        <div className='options-field'>
          <Checkbox label='Lưu mật khẩu' />
          <Link className='forgot-pw'>Quên mật khẩu?</Link>
        </div>

        <Button type='submit' className='submit-btn'>
          Đăng nhập ngay
        </Button>

        <div className='login-signup'>
          Chưa có tài khoản? <span onClick={toSignUp}>Tạo tài khoản</span>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  )
})

export default React.memo(LoginForm)
