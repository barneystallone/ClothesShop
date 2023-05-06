import React, { useRef, useState, Suspense, useMemo, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'

import { handleLazyLoadSvgPromise } from '../../../utils'
const CloseIcon = React.lazy(() =>
  handleLazyLoadSvgPromise(import('../../../assets/images/close.svg'))
)
const SubtractIcon = React.lazy(() =>
  handleLazyLoadSvgPromise(import('../../../assets/images/subtract.svg'))
)

import CheckBox from '../../../components/Checkbox'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectFilterByParentIdx,
  setFilter,
  setAllSubCategoryFilter
} from '../../../features/product/product.slice'
const SubCategoryFilter = (props) => {
  const { item, index } = props
  const filterList = useSelector(selectFilterByParentIdx(index))
  const [show, setShow] = useState(false)
  const [isCheckParent, setCheckParent] = useState(false)
  const ref = useRef(null)
  const dispatch = useDispatch()

  const subIdsArr = useMemo(() => {
    return item.sub_category.map((subCate) => subCate.id)
  }, [item])

  useEffect(() => {
    if (filterList?.length && filterList?.length === 0) {
      setCheckParent(false)
      return
    }
    if (item.sub_category?.length) {
      filterList?.length === item.sub_category.length
        ? setCheckParent(true)
        : setCheckParent(false)
    }
  }, [filterList, item.sub_category])

  const onChangeParent = useCallback(
    (elm) => {
      // if()
      dispatch(
        setAllSubCategoryFilter({
          index,
          subIdsArr,
          check: elm.checked
        })
      )
    },
    [subIdsArr, dispatch, index]
  )

  const handleToggleDropDown = () => {
    const wrapElm = ref.current.closest('.filter-left__content>div')
    const elm = ref.current.closest('.accordion__content')
    setShow(!show)
    elm.style.height = !show ? `${ref.current.offsetHeight}px` : 0

    wrapElm.closest('.filter-left__content').style.height = !show
      ? `${wrapElm.offsetHeight + ref.current.offsetHeight}px`
      : `${wrapElm.offsetHeight - ref.current.offsetHeight}px`
  }

  const onChangeChild = useCallback(
    (subId) => (elm) => {
      dispatch(setFilter({ index, subId, check: elm.checked }))
    },
    [index, dispatch]
  )
  return (
    <div className='accordion'>
      <div className='accordion__title '>
        <CheckBox
          label={item.category_name}
          onChange={onChangeParent}
          checked={isCheckParent}
        />
        <Suspense fallback={<div>...</div>}>
          <span className='right__icon' onClick={handleToggleDropDown}>
            {show ? (
              <SubtractIcon className='right__icon__svg' />
            ) : (
              <CloseIcon className={`right__icon__svg rotate`} />
            )}
          </span>
        </Suspense>
      </div>
      <div className={`accordion__content`}>
        <div ref={ref}>
          {item.sub_category.map((subItem) => (
            <div key={subItem.id} className=' accordion__content__item'>
              <CheckBox
                label={subItem.category_name}
                onChange={onChangeChild(subItem.id)}
                checked={filterList?.some((id) => id === subItem.id) === true ?? null}
              />
            </div>
          ))}
          {/* <AccordionItems subItems={item.sub_category} /> */}
        </div>
      </div>
    </div>
  )
}

SubCategoryFilter.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
}
export default SubCategoryFilter
