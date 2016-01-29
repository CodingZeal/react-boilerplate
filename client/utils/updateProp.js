import { compose, lensProp, over } from 'ramda'

export default compose(over, lensProp)
