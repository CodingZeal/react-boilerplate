import React from 'react'

import Header from '..'
import expectReactShallow from 'expect-react-shallow'

test('Header', () => {
  it('renders the root element as a div by default', () => {
    expectReactShallow(<Header />)
      .to.have.rendered(<div />)
  })
})
