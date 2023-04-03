import React from 'react'
import PropTypes from 'prop-types'
import { BsCheckLg } from 'react-icons/bs';
const CheckBox = props => {

    const inputRef = React.useRef(null)
    const className = props.className ? props.className : ''
    const onChange = () => {
        if (props.onChange) {
            props.onChange(inputRef.current)
        }
    }

    return (
        <>

            <label className={`custom-checkbox ${className}`}>
                <input type="checkbox" ref={inputRef} onChange={onChange} checked={props.checked} />
                <span className="custom-checkbox__checkmark">
                    <BsCheckLg />
                </span>
                {props.label}
            </label>
        </>
    )
}

CheckBox.propTypes = {
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool
}

export default React.memo(CheckBox)
