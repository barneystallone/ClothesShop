import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as CloseIcon } from '../../../assets/images/close.svg'
import { ReactComponent as SubtractIcon } from '../../../assets/images/subtract.svg'
const FilterLeft = (props) => {

    const [show, setShow] = useState(true);

    const ref = useRef(null);

    const handleClick = () => {

        const elm = ref.current.closest('.filter-left__content');

        setShow(!show);
        elm.style.height = !show ? `${ref.current.offsetHeight}px` : 0;

    }


    return (
        <div className="filter-left">
            <div className="filter-left__title">
                <span>{props.title}</span>
                <span className='filter-left__icon' onClick={handleClick}>
                    {show ? (
                        <SubtractIcon className='filter-left__icon__svg' />
                    ) : (
                        <CloseIcon className={`filter-left__icon__svg rotate`} />
                    )}
                </span>
            </div>
            <div className="filter-left__content" >
                <div ref={ref}>

                    {props.children}

                    {/* {
                            props.data.map((item, index) => (
                                <div key={index} className="filter-left__content__item">
                                    <CheckBox
                                        label={item.display}
                                    />
                                </div>
                            ))
                        } */}
                </div>
            </div>
        </div>
    )
}



FilterLeft.propTypes = {
    title: PropTypes.string.isRequired,
    // data: PropTypes.array.isRequired,
    nested: PropTypes.bool
}
export default FilterLeft