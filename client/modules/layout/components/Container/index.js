import React, { PropTypes } from 'react'

import Base from '../Base'

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export default function Container(props) {
  return <Base type='grid-container' {...props} />
}

Container.propTypes = propTypes
