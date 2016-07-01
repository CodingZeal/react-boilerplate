/* eslint-disable camelcase */
import '__tests__/specHelper'
import { expect } from 'chai'
import { prop } from 'ramda'
import sinon from 'sinon'

import { callApi, tranformCallDescriptor } from '../api'

describe('callApi', () => {
  let dispatch = null
  let onSuccess = null

  beforeEach(() => {
    dispatch = sinon.stub()
  })

  function api(callDescriptor) {
    const callbacks = { onSuccess }

    return callApi(callDescriptor, callbacks)(dispatch)
  }

  describe('callbacks', () => {
    context('after successful call', () => {
      const payload = { error: false }

      beforeEach(() => {
        dispatch.returns(Promise.resolve(payload))
      })

      it('calls the success callback', () => {
        onSuccess = sinon.spy()

        return api({}).then(() => {
          expect(onSuccess).to.have.been.called
        })
      })
    })
  })
})

describe('tranformCallDescriptor', () => {
  let getJson = null

  beforeEach(() => {
    getJson = sinon.stub()
  })

  function apiAction(callDescriptor) {
    return tranformCallDescriptor(callDescriptor, { getJson })
  }

  describe('request method', () => {
    it('uses GET by default', () => {
      expect(apiAction({}).method).to.eq('GET')
    })

    it('can override the request method', () => {
      expect(apiAction({ method: 'POST' }).method).to.eq('POST')
    })
  })

  describe('headers', () => {
    it('adds a content-type header', () => {
      expect(apiAction({}).headers).to.contain({
        'Content-Type': 'application/json'
      })
    })
  })

  describe('body', () => {
    it('JSON stringifies the body', () => {
      const body = { foo: 42 }
      const callDescriptor = { body }

      expect(JSON.parse(apiAction(callDescriptor).body)).to.eql(body)
    })

    it('converts body keys to snake_case', () => {
      const callDescriptor = { body: { fooBar: 42 } }
      const expected = { foo_bar: 42 }

      expect(JSON.parse(apiAction(callDescriptor).body)).to.eql(expected)
    })
  })

  describe('action type descriptors', () => {
    it('converts the SUCCESS action to a type descriptor', () => {
      const callDescriptor = {
        types: ['R', 'S', 'F']
      }

      expect(apiAction(callDescriptor).types[1].type).eql('S')
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

      expect(action.types[1]).to.have.property('meta', 'SUCCESS')
      expect(action.types[2]).to.have.property('meta', 'FAILURE')
    })

    describe('payload transformation', () => {
      const callDescriptor = {
        types: ['R', 'S', 'F']
      }
      const rawResponse = 'RAW RESPONSE'

      it('camelizes payload keys on SUCCESS', () => {
        const response = { foo_bar: 42 }
        const action = apiAction(callDescriptor)

        getJson.withArgs(rawResponse).returns(Promise.resolve(response))

        const actual = action.types[1].payload(null, null, rawResponse)

        return expect(actual).to.become({ fooBar: 42 })
      })

      it('camelizes payload keys on FAILURE', () => {
        const response = { last_name: 'Smith' }

        getJson.withArgs(rawResponse).returns(Promise.resolve(response))
        const action = apiAction(callDescriptor)
        const apiError = action.types[2].payload(null, null, rawResponse)
        const actual = apiError.then(prop('response'))

        return expect(actual).to.become({ lastName: 'Smith' })
      })

      it('booleanizes payload values on SUCCESS', () => {
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

        getJson.withArgs(rawResponse).returns(Promise.resolve(response))
        const action = apiAction(callDescriptor)
        const actual = action.types[1].payload(null, null, rawResponse)

        return expect(actual).to.become({
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
