import React from 'react'
import expectReactShallow from 'expect-react-shallow'

import Base from '../../Base'
import Content from '..'

describe('Content', () => {
  it('uses a Base with type of grid-content', () => {
    expectReactShallow(<Content />)
      .to.have.rendered(<Base type='grid-content' />)
  })

  it('forwards all other props to the base component', () => {
    expectReactShallow(
      <Content foo className='bar'>
        <h1>Test</h1>
      </Content>
    ).to.have.rendered(
      <Base foo className='bar' type='grid-content'>
        <h1>Test</h1>
      </Base>
    )
  })
})
