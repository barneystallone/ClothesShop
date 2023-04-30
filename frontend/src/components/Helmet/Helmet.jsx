import React from 'react'
import PropTypes from 'prop-types'

const Helmet = (props) => {
  document.title = props.title ? 'Shop - ' + props.title : 'Shop'

  return <div>{props.children}</div>
}

Helmet.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any
}

export default Helmet
