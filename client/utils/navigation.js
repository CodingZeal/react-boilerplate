import { NamedURLResolver } from 'react-router-named-routes'
import { browserHistory } from 'react-router'

// eslint-disable-next-line import/prefer-default-export
export function navigateTo(routeName) {
  return browserHistory.push(namedRoute(routeName))
}

function namedRoute(name, params = {}) {
  return NamedURLResolver.resolve(name, params)
}
