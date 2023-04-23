import React from 'react'
import { ReactComponent as CloseIcon } from '../assets/images/close.svg'
import { HiOutlineEnvelope } from 'react-icons/hi2'
import { HiOutlineEyeOff } from 'react-icons/hi2'
import { HiOutlineEye } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import Button from './Button'
const LoginSignUpModal = () => {
    return (
        <div className="login-signup__modal">
            <div className="login-signup__modal__wrap">
                <div className="login-signup__modal__header">
                    <div className="login-signup__modal__header__wrap-icon">
                        <CloseIcon className="icon" />
                    </div>
                </div>
                <div className="login-signup__modal__body">
                    <LoginForm />
                    <SignUpForm />
                </div>

            </div>
        </div>
    )
}

const LoginForm = React.memo(() => {
    return (
        <div className='form login-form'>
            <form action="">
                <h2>Đăng nhập</h2>
                <div className="input__box email">
                    <input type="text" placeholder='acb@gmail.com' />
                    <HiOutlineEnvelope className="input__box__icon input__box__icon--pre" />
                </div>
                <div className="input__box password">
                    <HiOutlineEye className="input__box__icon active" />
                </div>
                <div className="options-field">
                    <span>
                        <input type="checkbox" id='remember-check' />
                        <label htmlFor="remember-check">Lưu mật khẩu</label>
                    </span>
                    <Link className='forgot-pw'>Quên mật khẩu?</Link>
                </div>

                <Button>Đăng nhập ngay</Button>

                <div className="login-signup">Chưa có tài khoản? <Link>Tạo tài khoản</Link></div>
            </form>
        </div>
    )
})
const SignUpForm = React.memo(() => {
    return (
        <div className='form signup-form'>
            <form action="">
                <h2>Đăng ký</h2>
                <div className="input__box email">
                    <input type="text" placeholder='acb@gmail.com' />
                    <HiOutlineEnvelope className="input__box__icon input__box__icon--pre" />
                </div>
                <div className="input__box password">
                    <HiOutlineEye className="input__box__icon active" />
                </div>
                <div className="input__box confirm-password">
                    <HiOutlineEye className="input__box__icon active" />
                </div>

                <Button>Đăng ký ngay</Button>

                <div className="login-signup">Đã có tài khoản? <Link>Quay lại đăng ký</Link></div>
            </form>
        </div>
    )
})
export default LoginSignUpModal