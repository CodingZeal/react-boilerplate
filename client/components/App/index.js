import { PropTypes } from 'react'

const propTypes = {
  children: PropTypes.element
}

export default function App({ children }) {
  return children
}

App.propTypes = propTypes
