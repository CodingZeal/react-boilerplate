import React from 'react'
import expectReactShallow from 'expect-react-shallow'

import Base from '../../internal/Base'
import Container from '..'

describe('Container', () => {
  it('uses a Base with type of grid-container', () => {
    expectReactShallow(<Container />)
      .to.have.rendered(<Base type='grid-container' />)
  })

  it('forwards all other props to the base component', () => {
    expectReactShallow(
      <Container foo className='bar'>
        <h1>Test</h1>
      </Container>
    ).to.have.rendered(
      <Base foo className='bar' type='grid-container'>
        <h1>Test</h1>
      </Base>
    )
  })
})
