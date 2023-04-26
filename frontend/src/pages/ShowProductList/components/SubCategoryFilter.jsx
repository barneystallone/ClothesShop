import React, { useRef, useState, Suspense } from 'react'
import PropTypes from 'prop-types'

import { handleLazyLoadSvgPromise } from '../../../utils'
const CloseIcon = React.lazy(() => handleLazyLoadSvgPromise(import('../../../assets/images/close.svg')))
const SubtractIcon = React.lazy(() => handleLazyLoadSvgPromise(import('../../../assets/images/subtract.svg')))

import CheckBox from '../../../components/Checkbox'
const SubCategoryFilter = (props) => {
  const [show, setShow] = useState(false)

  const ref = useRef(null)

  const item = props.item
  const handleClick = () => {
    const wrapElm = ref.current.closest('.filter-left__content>div')
    const elm = ref.current.closest('.accordion__content')
    setShow(!show)
    elm.style.height = !show ? `${ref.current.offsetHeight}px` : 0

    wrapElm.closest('.filter-left__content').style.height = !show
      ? `${wrapElm.offsetHeight + ref.current.offsetHeight}px`
      : `${wrapElm.offsetHeight - ref.current.offsetHeight}px`
  }

  return (
    <div className='accordion'>
      <div className='accordion__title '>
        <CheckBox label={item.category_name} />
        <Suspense fallback={<div>...</div>}>
          <span className='right__icon' onClick={handleClick}>
            {show ? <SubtractIcon className='right__icon__svg' /> : <CloseIcon className={`right__icon__svg rotate`} />}
          </span>
        </Suspense>
      </div>
      <div className={`accordion__content`}>
        <div ref={ref}>
          <AccordionItems subItems={item.sub_category} />
        </div>
      </div>
    </div>
  )
}

const AccordionItems = React.memo(({ subItems }) => {
  return (
    <>
      {subItems.map((subItem) => (
        <div key={subItem.id} className=' accordion__content__item'>
          <CheckBox label={subItem.category_name} />
        </div>
      ))}
    </>
  )
})
AccordionItems.displayName = 'AccordionItems'

AccordionItems.propTypes = {
  subItems: PropTypes.array
}

SubCategoryFilter.propTypes = {
  item: PropTypes.object.isRequired
}
export default SubCategoryFilter
