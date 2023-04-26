import React from 'react'
import PropTypes from 'prop-types'

const Grid = React.forwardRef((props, ref) => {
  const style = {
    gap: props.gap ? `${props.gap}px` : ''
  }
  const col = props.col ? `grid-col-${props.col}` : ''
  const mdCol = props.mdCol ? `grid-col-md-${props.mdCol}` : ''
  const smCol = props.smCol ? `grid-col-sm-${props.smCol}` : ''
  return (
    <div ref={ref} className={`grid ${col} ${mdCol} ${smCol} ${props?.className}`} style={style}>
      {props.children}
    </div>
  )
})
Grid.displayName = 'Grid'
Grid.propTypes = {
  col: PropTypes.number.isRequired,
  mdCol: PropTypes.number,
  smCol: PropTypes.number,
  gap: PropTypes.number,
  className: PropTypes.string
}

export default Grid
