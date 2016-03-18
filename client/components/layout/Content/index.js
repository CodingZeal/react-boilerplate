import React, { PropTypes } from 'react'

import Base from '../internal/Base'

const propTypes = {
  align: PropTypes.oneOf(['left', 'right']),
  children: PropTypes.node,
  className: PropTypes.string,
  shrink: PropTypes.bool
}

export default function Content(props) {
  return <Base type='grid-content' {...props} />
}

Content.propTypes = propTypes
