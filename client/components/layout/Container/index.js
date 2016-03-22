import React, { PropTypes } from 'react'

import Base from '../internal/Base'

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export default function Container(props) {
  return <Base type='grid-container' {...props} />
}

Container.propTypes = propTypes
