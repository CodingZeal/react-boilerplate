import { history } from 'base'

// eslint-disable-next-line import/prefer-default-export
export function navigateTo(name) {
  return history.push({ name })
}
