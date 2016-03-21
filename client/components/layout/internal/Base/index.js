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
  // Temporary workaround for: https://github.com/babel/babel-eslint/issues/249
  /* eslint-disable no-use-before-define */
  const {
    align,
    children,
    className,
    elementType,
    shrink,
    type,
    vertical,
    ...otherProps
  } = props /* eslint-enable no-use-before-define */

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
