import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as PlusIcon } from '../assets/images/plus.svg'
import { ReactComponent as MinusIcon } from '../assets/images/minus.svg'
const QuantityInput = props => {

    const ref = useRef(null);

    const incr = (negative = false) => {
        // let value = ref.current.value * 1;'
        // console.log(ref.current.value == false);
        if (((Boolean(ref.current.value) === false) || (ref.current.value * 1 <= 1)) && (negative)) return;
        ref.current.value = ref.current.value * 1 + (negative ? -1 : 1)
    }
    return (
        <div className={`${props.className} wrap-quantity`}>
            <div className="wrap-quantity__btn btn-minus " onClick={() => incr(true)}>
                <MinusIcon className='minus-icon' />
            </div>
            <input ref={ref} className='wrap-quantity__input color-blue' type="number" onChange={(e) => { console.log(e.target.value); }} />
            <div className="wrap-quantity__btn btn-plus" onClick={() => incr()}>
                <PlusIcon className='plus-icon' />
            </div>
        </div>
    )
}

QuantityInput.propTypes = {
    className: PropTypes.string,
}

export default QuantityInput