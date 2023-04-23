import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as CloseIcon } from '../../../assets/images/close.svg'
import { ReactComponent as SubtractIcon } from '../../../assets/images/subtract.svg'
import CheckBox from '../../../components/Checkbox'
const SubCategoryFilter = (props) => {
    const [show, setShow] = useState(false);

    const ref = useRef(null);

    const item = props.item
    const handleClick = () => {

        const wrapElm = ref.current.closest('.filter-left__content>div');
        const elm = ref.current.closest('.accordion__content');
        setShow(!show);
        elm.style.height = !show ? `${ref.current.offsetHeight}px` : 0;

        wrapElm.closest('.filter-left__content').style.height =
            !show ? (
                `${wrapElm.offsetHeight + ref.current.offsetHeight}px`
            ) : (
                `${wrapElm.offsetHeight - ref.current.offsetHeight}px`
            )
    }

    return (
        <div className='accordion'>

            <div className="accordion__title ">
                <CheckBox label={item.category_name} />
                <span className='right__icon' onClick={handleClick}>
                    {show ? (
                        <SubtractIcon className='right__icon__svg' />
                    ) : (
                        <CloseIcon className={`right__icon__svg rotate`} />
                    )}

                </span>
            </div>
            <div className={`accordion__content`}>
                <div ref={ref}>
                    <AccordionItems subItems={item.sub_category} />
                    {/* <div className=" accordion__content__item">
                        <CheckBox label={item.category_name} />
                    </div>
                    <div className=" accordion__content__item">
                        <CheckBox label={item.category_name} checked={props.checked} />
                    </div>
                    <div className=" accordion__content__item">
                        <CheckBox label={item.category_name} />
                    </div> */}
                </div>

            </div>
        </div>
    )
}

const AccordionItems = React.memo(({ subItems }) => {
    // console.log(subItems);
    return (
        <>
            {
                subItems.map(subItem => (
                    <div key={subItem.id} className=" accordion__content__item">
                        <CheckBox label={subItem.category_name} />
                    </div>
                ))

            }
        </>
    )
})

SubCategoryFilter.propTypes = {
    item: PropTypes.object.isRequired,

}
export default SubCategoryFilter