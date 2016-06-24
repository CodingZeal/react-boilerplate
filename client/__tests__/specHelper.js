import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import td from 'testdouble'

chai.use(chaiAsPromised)

afterEach('reset testdouble', () => {
  td.reset()
})
