import React, { PropTypes } from 'react'
import classnames from 'classnames'

const propTypes = {
  align: PropTypes.oneOf(['center', 'justify', 'left', 'right', 'spaced']),
  children: PropTypes.node,
  className: PropTypes.string,
  elementType: PropTypes.string.isRequired,
  shrink: PropTypes.bool,
  type: PropTypes.string.isRequired,
  vertical: PropTypes.bool
}

const defaultProps = {
  elementType: 'div'
}

export default function Base(props) {
  const {
    align,
    children,
    className,
    elementType,
    shrink,
    type,
    vertical,
    ...otherProps
  } = props

  const classNames = classnames(type, className, {
    [`align-${align}`]: align,
    shrink,
    vertical
  })

  return React.createElement(
    elementType,
    { className: classNames, ...otherProps },
    children
  )
}

Base.defaultProps = defaultProps
Base.propTypes = propTypes
