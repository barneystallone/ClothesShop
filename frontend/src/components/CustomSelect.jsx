import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';
import { ReactComponent as DownIcon } from '../assets/images/down.svg'
const CustomSelect = props => {
    const [show, setShow] = useState(false);
    return (
        <div className={`custom-select ${props.className}`}>
            <div className={classNames("custom-select__content", {
                "show": show
            })} onClick={() => setShow(!show)}>
                <div className="custom-select__content--left">
                    {props.title}
                </div>
                <div className="custom-select__content--right">
                    <div className="center">
                        <DownIcon className="custom-select__icon down-icon" />
                    </div>
                </div>
                <div className={classNames("custom-select__content__dropdown ")}>
                    {/* <div key={index} className="custom-select__content__dropdown__option" >S</div>                 */}
                    {props.children}
                </div >
            </div >
        </div >
    )
}

CustomSelect.propTypes = {
    title: PropTypes.string.isRequired,
    className: PropTypes.string
}

export default CustomSelect