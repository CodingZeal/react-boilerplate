import { head, map } from 'ramda'

export function formApiAdapter(dispatch, actionCreator) {
  return (...args) =>
    new Promise((resolve, reject) => {
      dispatch(actionCreator(...args)).then(response => {
        if (response.error) {
          reject(formatErrors(response))
        } else {
          resolve(response)
        }
      })
    })
}

function formatErrors(response) {
  const status = response.payload.status
  const details = response.payload.response.error.details
  const extractFieldErrors = map(head)

  return (status === 422) ? extractFieldErrors(details) : response
}
