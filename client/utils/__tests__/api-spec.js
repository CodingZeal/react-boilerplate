/* eslint-disable camelcase */
import { prop } from 'ramda'
import td from 'testdouble'

import { callApi, tranformCallDescriptor } from '../api'

describe('callApi', () => {
  const dispatch = td.func('dispatch')
  const onSuccess = td.func('onSuccess')

  function api(callDescriptor) {
    const callbacks = { onSuccess }

    return callApi(callDescriptor, callbacks)(dispatch)
  }

  describe('callbacks', () => {
    context('after successful call', () => {
      const payload = { error: false }

      beforeEach(() => {
        td.when(dispatch(td.matchers.anything()))
          .thenReturn(Promise.resolve(payload))
      })

      // eslint-disable-next-line arrow-body-style
      it('calls the success callback', () => {
        return api({}).then(() => {
          td.verify(onSuccess(payload, dispatch))
        })
      })
    })
  })
})

describe('tranformCallDescriptor', () => {
  const getJson = td.func('getJson')

  function apiAction(callDescriptor) {
    return tranformCallDescriptor(callDescriptor, { getJson })
  }

  describe('request method', () => {
    it('uses GET by default', () => {
      expect(apiAction({}).method).toEqual('GET')
    })

    it('can override the request method', () => {
      expect(apiAction({ method: 'POST' }).method).toEqual('POST')
    })
  })

  describe('headers', () => {
    it('adds a content-type header', () => {
      expect(apiAction({}).headers['Content-Type']).toBe('application/json')
    })

    it('can override the Content-Type header', () => {
      const action = {
        headers: {
          'Content-Type': 'text/plain'
        }
      }

      expect(apiAction(action).headers['Content-Type']).toBe('text/plain')
    })

    it('merges in additional headers', () => {
      const action = {
        headers: {
          Authorization: 'Bearer TOKEN'
        }
      }

      expect(apiAction(action).headers).toEqual({
        'Content-Type': 'application/json',
        Authorization: 'Bearer TOKEN'
      })
    })
  })

  describe('body', () => {
    it('JSON stringifies the body', () => {
      const body = { foo: 42 }
      const callDescriptor = { body }

      expect(JSON.parse(apiAction(callDescriptor).body)).toEqual(body)
    })

    it('converts body keys to snake_case', () => {
      const callDescriptor = { body: { fooBar: 42 } }
      const expected = { foo_bar: 42 }

      expect(JSON.parse(apiAction(callDescriptor).body)).toEqual(expected)
    })
  })

  describe('action type descriptors', () => {
    it('converts the SUCCESS action to a type descriptor', () => {
      const callDescriptor = {
        types: ['R', 'S', 'F']
      }

      expect(apiAction(callDescriptor).types[1].type).toEqual('S')
    })

    it('preserves SUCCESS and FAILURE actions as type descriptors', () => {
      const callDescriptor = {
        types: [
          'R',
          {
            type: 'S',
            meta: 'SUCCESS'
          },
          {
            type: 'F',
            meta: 'FAILURE'
          }
        ]
      }
      const action = apiAction(callDescriptor)

      expect(action.types[1].meta).toBe('SUCCESS')
      expect(action.types[2].meta).toBe('FAILURE')
    })

    describe('payload transformation', () => {
      const callDescriptor = {
        types: ['R', 'S', 'F']
      }
      const rawResponse = 'RAW RESPONSE'

      it('camelizes payload keys on SUCCESS', async () => {
        const response = { foo_bar: 42 }
        const action = apiAction(callDescriptor)

        td.when(getJson(rawResponse)).thenReturn(Promise.resolve(response))

        const actual = await action.types[1].payload(null, null, rawResponse)

        expect(actual).toEqual({ fooBar: 42 })
      })

      it('camelizes payload keys on FAILURE', async () => {
        const response = { last_name: 'Smith' }

        td.when(getJson(rawResponse)).thenReturn(Promise.resolve(response))
        const action = apiAction(callDescriptor)
        const apiError = action.types[2].payload(null, null, rawResponse)
        const actual = await apiError.then(prop('response'))

        expect(actual).toEqual({ lastName: 'Smith' })
      })

      it('booleanizes payload values on SUCCESS', async () => {
        const response = {
          has_header: 'false',
          is_true: 'true',
          really_true: true,
          really_false: false,
          a_string: 'test',
          foo: {
            nested_false: 'false',
            nested_string: 'test'
          }
        }

        td.when(getJson(rawResponse)).thenReturn(Promise.resolve(response))
        const action = apiAction(callDescriptor)
        const actual = await action.types[1].payload(null, null, rawResponse)

        expect(actual).toEqual({
          hasHeader: false,
          isTrue: true,
          reallyTrue: true,
          reallyFalse: false,
          aString: 'test',
          foo: {
            nestedFalse: false,
            nestedString: 'test'
          }
        })
      })
    })
  })
})
