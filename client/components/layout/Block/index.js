import React, { PropTypes } from 'react'

import Base from '../internal/Base'

const propTypes = {
  align: PropTypes.oneOf(['left', 'right']),
  children: PropTypes.node,
  className: PropTypes.string,
  shrink: PropTypes.bool,
  vertical: PropTypes.bool
}

export default function Block(props) {
  return <Base type='grid-block' {...props} />
}

Block.propTypes = propTypes
