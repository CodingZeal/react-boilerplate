import '__tests__/specHelper'
import { expect } from 'chai'
import sinon from 'sinon'

import { formApiAdapter } from '../form'

describe('formApiAdapter', () => {
  const formValues = { name: 'NAME', age: 42 }
  const action = { type: 'SOME_ACTION' }
  const dispatch = sinon.stub()
  const actionCreator = sinon.stub()

  beforeEach(() => {
    actionCreator.withArgs(formValues).returns(action)
  })

  context('on a successful API call', () => {
    const payload = {
      payload: {
        status: 200,
        response: {
          status: 200,
          id: 4
        }
      }
    }

    beforeEach(() => {
      dispatch.withArgs(action).returns(Promise.resolve(payload))
    })

    it('resolves with the api response', () => {
      const adapter = formApiAdapter(dispatch, actionCreator)

      return expect(adapter(formValues)).to.become(payload)
    })
  })

  context('on a failing API call', () => {
    describe('422 Unprocessable Entity', () => {
      const payload = {
        error: true,
        payload: {
          status: 422,
          response: {
            status: 422,
            error: {
              details: {
                firstName: ['FIRST NAME ERROR', 'OTHER ERROR'],
                lastName: ['LAST NAME ERROR']
              }
            }
          }
        }
      }

      beforeEach(() => {
        dispatch.withArgs(action).returns(Promise.resolve(payload))
      })

      it('rejects with api error on failure', () => {
        const adapter = formApiAdapter(dispatch, actionCreator)

        return expect(adapter(formValues)).to.be.rejected
      })

      it('formats the error payload', () => {
        const adapter = formApiAdapter(dispatch, actionCreator)
        const expected = {
          firstName: 'FIRST NAME ERROR',
          lastName: 'LAST NAME ERROR'
        }

        return adapter(formValues).catch(failure =>
          expect(failure).to.eql(expected)
        )
      })
    })

    describe('Other failures', () => {
      const payload = {
        error: true,
        payload: {
          status: 401,
          response: {
            error: 'Not authorized'
          }
        }
      }

      beforeEach(() => {
        dispatch.withArgs(action).returns(Promise.resolve(payload))
      })

      it('rejects the promise', () => {
        const adapter = formApiAdapter(dispatch, actionCreator)

        // fails with a timeout if exception raised in promise, check console
        return expect(adapter(formValues)).to.be.rejected
      })

      it('wraps the full error payload in an ApiError', () => {
        const adapter = formApiAdapter(dispatch, actionCreator)

        return adapter(formValues).catch(failure =>
          expect(failure).to.eql(payload)
        )
      })
    })
  })
})
