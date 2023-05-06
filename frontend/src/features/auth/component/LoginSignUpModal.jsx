import React, { useCallback, useEffect, useRef, useState, Suspense } from 'react'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { toast } from 'react-toastify'

import { selectShowModalStatus, setCredentials, setShowModalStatus } from '../auth.slice'
import { useModal, useToggle } from '../../../hook'
import { handleLazyLoadSvgPromise } from '../../../utils'
const CloseIcon = React.lazy(() =>
  handleLazyLoadSvgPromise(import('../../../assets/images/close.svg'))
)
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import { useLoginMutation, useRegisterMutation } from '../auth.service'
import { useDispatch } from 'react-redux'
import { persistor } from '../../../store'

const LOGIN_SUCCESS_MSG = 'Đăng nhập thành công'
const REGISTER_SUCCESS_MSG = 'Đăng ký thành công'

const LoginSignUpModal = () => {
  const modalBodyRef = useRef(null)
  const loginRef = useRef(null)
  const registerRef = useRef(null)
  const [showLogin, toggleFormLogin] = useToggle(true)
  const [loginHeightChange, updateLoginHeight] = useToggle()
  const [signUpHeightChange, updateSignUpHeight] = useToggle()
  const { show, closeModal } = useModal(setShowModalStatus, selectShowModalStatus)
  const [login] = useLoginMutation()
  const [register] = useRegisterMutation()
  const dispatch = useDispatch()

  const handleAuthPromise = useCallback((promise, successMessage) => {
    return promise
      .unwrap()
      .then((payload) => {
        if (successMessage === LOGIN_SUCCESS_MSG) {
          dispatch(setCredentials(payload))
          persistor.pause()
          persistor.purge()
        }
        dispatch(setShowModalStatus(false))
        toast.success(successMessage)
      })
      .catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const onLoginSubmit = useCallback(
    (data) => {
      handleAuthPromise(login(data), LOGIN_SUCCESS_MSG)
    },
    [login, handleAuthPromise]
  )

  const onSignUpSubmit = useCallback(
    ({ email, password, ...rest }) => {
      handleAuthPromise(register({ email, password }), REGISTER_SUCCESS_MSG)
    },
    [register, handleAuthPromise]
  )

  /**
   * set height của  element bọc  2 form login , signup
   * khi login <-> signup hoặc là khi height của form thay đổi
   */
  useEffect(() => {
    modalBodyRef?.current &&
      (modalBodyRef.current.style.height = showLogin
        ? `${loginRef.current.offsetHeight}px`
        : `${registerRef.current.offsetHeight}px`)
  }, [signUpHeightChange, loginHeightChange, showLogin])
  return show ? (
    <div className='login-signup__modal' onClick={closeModal}>
      <div className='login-signup__modal__wrap'>
        <div className='login-signup__modal__wrap__icon' onClick={(e) => closeModal(e)}>
          <Suspense fallback={<div>...</div>}>
            <CloseIcon className='icon' />
          </Suspense>
        </div>
        <div className='login-signup__modal__wrap__content'>
          <div className='modal__body ' ref={modalBodyRef}>
            <LoginForm
              ref={loginRef}
              onSubmit={onLoginSubmit}
              updateHeight={updateLoginHeight}
              resolver={joiResolver(loginSchema)}
              navigate={toggleFormLogin}
              showLogin={showLogin}
            />
            <SignUpForm
              ref={registerRef}
              onSubmit={onSignUpSubmit}
              updateHeight={updateSignUpHeight}
              resolver={joiResolver(registerSchema)}
              navigate={toggleFormLogin}
              showLogin={showLogin}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .pattern(new RegExp('gmail.com$'))
    .required()
    .label('Email')
    .messages({
      'string.pattern.base': 'Top level domain phải là gmail.com'
    }),
  password: Joi.string().min(4).max(32).required().label('Mật khẩu')
}).messages({
  'string.min': '{#label} phải có ít nhất 4 ký tự',
  'string.email': '{#label} không hợp lệ',
  'string.max': '{#label} không được quá 32 ký tự',
  'string.empty': '{#label} không được bỏ trống'
})

const registerSchema = loginSchema.concat(
  Joi.object({
    confirmPassword: Joi.string().valid(Joi.ref('password'))
  }).messages({
    'any.only': 'Mật khẩu xác nhận không khớp'
  })
)

export default React.memo(LoginSignUpModal)
