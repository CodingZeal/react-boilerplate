import { formApiAdapter } from '../form'

describe('formApiAdapter', () => {
  const formValues = { name: 'NAME', age: 42 }
  const action = { type: 'SOME_ACTION' }
  const dispatch = td.func('dispatch')
  const actionCreator = td.func('actionCreator')

  beforeEach(() => {
    td.when(actionCreator(formValues)).thenReturn(action)
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
      td.when(dispatch(action)).thenReturn(Promise.resolve(payload))
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
        td.when(dispatch(action)).thenReturn(Promise.resolve(payload))
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
        td.when(dispatch(action)).thenReturn(Promise.resolve(payload))
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
