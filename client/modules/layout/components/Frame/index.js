import React, { PropTypes } from 'react'

import Base from '../Base'

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export default function Frame(props) {
  return <Base type='grid-frame' {...props} />
}

Frame.propTypes = propTypes
