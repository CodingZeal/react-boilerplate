import React, { PropTypes } from 'react'

import Base from '../Base'

const propTypes = {
  align: PropTypes.oneOf(['center', 'justify', 'left', 'right', 'spaced']),
  children: PropTypes.node,
  className: PropTypes.string,
  shrink: PropTypes.bool
}

export default function Content(props) {
  return <Base type='grid-content' {...props} />
}

Content.propTypes = propTypes
