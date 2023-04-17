import classNames from 'classnames';
import React, { useCallback, useMemo, useState } from 'react'
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { RiErrorWarningFill } from 'react-icons/ri';
import { RxLockClosed } from 'react-icons/rx';

const PasswordField = ({ className, placeholder, register, error }) => {

    const [show, setShow] = useState(false);

    const showHidePassword = useCallback(() => {
        setShow(!show);
    }, [show])

    const eyeIconStyled = useMemo(() => ({
        right: error ? '20px' : 0
    }), [error])

    return (
        <div className={classNames(`fields ${className ?? ''}`, {
            "error__field": !!error
        })}>
            <div className={`input__box ${className}`}>
                <input type={!show ? "password" : "text"} placeholder={placeholder} {...register} />
                <RiErrorWarningFill className={classNames("input__box__icon  ", {
                    "visible": !!error
                })} />
                <RxLockClosed className="input__box__icon input__box__icon--pre" />
                <HiOutlineEye className={classNames("input__box__icon ", {
                    "visible": !show
                })} style={eyeIconStyled} onClick={showHidePassword} />
                <HiOutlineEyeOff className={classNames("input__box__icon ", {
                    "visible": show
                })} style={eyeIconStyled} onClick={showHidePassword} />
            </div>
            <p className='color-red error__message'>{error?.message}</p>
        </div>


    )
}
export default React.memo(PasswordField)