import React from 'react'
import PropTypes from 'prop-types'

const Cart = (props) => {
  return <div>Cart</div>
}

Cart.propTypes = {
  subCart: PropTypes.bool.isRequired
}

export default React.memo(Cart)
