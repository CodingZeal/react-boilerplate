import { camelizeKeys, decamelizeKeys } from 'humps'
import {
  adjust,
  compose,
  contains,
  evolve,
  identity,
  map,
  merge,
  mergeWith
} from 'ramda'
import { CALL_API, ApiError, getJSON } from 'redux-api-middleware'

const defaultCallbacks = {
  onSuccess: identity
}
const defaultDependencies = {
  getJson: getJSON
}

export function callApi(call, callbacks = {}, dependencies = {}) {
  const mergedCallbacks = merge(defaultCallbacks, callbacks)
  const mergedDependencies = merge(defaultDependencies, dependencies)

  return dispatch =>
    dispatch({
      [CALL_API]: tranformCallDescriptor(call, mergedDependencies)
    }).then(response =>
      response && handleResponse(response, mergedCallbacks, dispatch)
    )
}

function handleResponse(response, callbacks, dispatch) {
  return response.error
    ? response
    : handleApiSuccess(response, callbacks, dispatch)
}

function handleApiSuccess(response, { onSuccess }, dispatch) {
  return onSuccess(response, dispatch)
}

// exported for testing only
export function tranformCallDescriptor(call, { getJson }) {
  const transform = compose(
    evolve({
      body: compose(JSON.stringify, decamelizeKeys),
      types: compose(
        adjust(tranformSuccessPayload(getJson), 1),
        adjust(transformFailurePayload(getJson), 2)
      )
    }),
    merge({
      method: 'GET'
    }),
    mergeWith(merge, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  )

  return transform(call)
}

function tranformSuccessPayload(getJson) {
  return type => (
    {
      ...objectize(type),
      payload: (action, state, res) =>
        getJson(res).then(camelizeKeys).then(booleanizeValues)
    }
  )
}

function transformFailurePayload(getJson) {
  return type => (
    {
      ...objectize(type),
      payload: (action, state, res) => getJson(res).then(json =>
        new ApiError(res.status, res.statusText, camelizeKeys(json))
      )
    }
  )
}

function objectize(type) {
  return contains(typeof type, ['string', 'symbol'])
    ? { type }
    : type
}

/* eslint complexity: [1, 3] */
function booleanizeValues(payload) {
  const convertStringToBoolean = value => {
    switch (value) {
      case 'true':
        return true
      case 'false':
        return false
      default:
        return value
    }
  }
  const makeBoolean = value => {
    if (typeof value === 'object' && value !== null) {
      return map(makeBoolean, value)
    }
    return convertStringToBoolean(value)
  }

  return map(makeBoolean, payload)
}
