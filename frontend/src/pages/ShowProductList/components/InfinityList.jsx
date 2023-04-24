import React, { useEffect, useRef, useState, useMemo } from 'react'
import PropTypes from 'prop-types'

import { ProductCard } from '../../../features/product'
import Grid from '../../../components/Grid'
import Skeleton from 'react-loading-skeleton'

const InfinityList = (props) => {
  const perLoad = 8

  const listRef = useRef(null)

  const [data, setData] = useState([])

  const [load, setLoad] = useState(true)

  const [index, setIndex] = useState(0)

  const skeletons = useMemo(
    () =>
      Array.from({ length: perLoad }, (_, i) => (
        <div key={i} style={{ backgroundColor: '#fff' }}>
          <Skeleton duration={0.6} height={300} />
          <p>
            <Skeleton duration={0.6} height={25} style={{ marginTop: '8px' }} />
            <Skeleton duration={0.6} height={25} style={{ marginTop: '8px' }} />
            <Skeleton duration={0.6} height={25} style={{ marginTop: '8px' }} />
          </p>
        </div>
      )),
    []
  )

  useEffect(() => {
    setData(props.resp?.data?.slice(0, perLoad))
    setIndex(1)
  }, [props.resp?.data])

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (listRef && listRef.current) {
        if (window.scrollY + window.innerHeight >= listRef.current.clientHeight + listRef.current.offsetTop + 200) {
          // console.log("bottom reach")
          setLoad(true)
        }
      }
    })
  }, [listRef])

  useEffect(() => {
    const getItems = () => {
      const pages = Math.floor(props.resp?.data?.length / perLoad)
      const maxIndex = props.resp?.data?.length % perLoad === 0 ? pages : pages + 1

      if (load && index <= maxIndex) {
        const start = perLoad * index
        const end = start + perLoad

        setData(data.concat(props.resp?.data?.slice(start, end)))
        setIndex(index + 1)
      }
    }
    getItems()
    setLoad(false)
  }, [load, index, data, props.resp?.data])

  return (
    <div ref={listRef}>
      <Grid col={4} mdCol={3} smCol={2} gap={20}>
        {props.hasCallApi
          ? [...skeletons]
          : data?.map((item, index) => (
              <ProductCard
                {...item}
                key={index}
                // categorySlug={item.categorySlug}
                // title={item.title}
                // colors={item.colors}
                // price={Number(item.price)}
                // slug={item.slug}
                // sale={Number(item.sale)}
              />
            ))}
      </Grid>
    </div>
  )
}

InfinityList.propTypes = {
  resp: PropTypes.shape({
    total: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.object),
    meta: PropTypes.shape({
      page: PropTypes.number,
      itemPerPage: PropTypes.number
    })
  }),
  hasCallApi: PropTypes.bool.isRequired
}

export default React.memo(InfinityList)
