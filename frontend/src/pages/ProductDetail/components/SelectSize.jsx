import React from 'react'
import PropTypes from 'prop-types'
import CustomSelect from '../../../components/CustomSelect';

const SelectSize = props => {
    const handleClick = (e) => {
        if (props.onClick) {
            props.onClick(e.target);
        } else {
            console.log(e.target.dataset.index);
        }
    }
    return (
        <CustomSelect title={props.title} className={props.className}>
            {
                props.sizes?.map((size, index) => (
                    <div key={index} className="custom-select__content__dropdown__option" onClick={handleClick} data-index={index}>{size.display}</div>
                ))
            }
        </CustomSelect>
    )
}

SelectSize.propTypes = {
    onClick: PropTypes.func,
    title: PropTypes.string.isRequired,
    sizes: PropTypes.arrayOf(PropTypes.object).isRequired,
    className: PropTypes.string
}

export default React.memo(SelectSize)