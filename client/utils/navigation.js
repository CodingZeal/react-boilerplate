import { NamedURLResolver } from 'react-router-named-routes'
import { push } from 'react-router-redux'

export function navigateTo(routeName) {
  return push(namedRoute(routeName))
}

function namedRoute(name, params = {}) {
  return NamedURLResolver.resolve(name, params)
}
