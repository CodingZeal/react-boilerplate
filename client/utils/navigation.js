import { NamedURLResolver } from 'react-router-named-routes'
import { browserHistory } from 'react-router'

export function navigateTo(routeName) {
  return browserHistory.push(namedRoute(routeName))
}

function namedRoute(name, params = {}) {
  return NamedURLResolver.resolve(name, params)
}
