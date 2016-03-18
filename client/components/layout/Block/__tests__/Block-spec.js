import React from 'react'
import expectReactShallow from 'expect-react-shallow'

import Base from '../../internal/Base'
import Block from '..'

describe('Block', () => {
  it('uses a Base with type of grid-block', () => {
    expectReactShallow(<Block />)
      .to.have.rendered(<Base type='grid-block' />)
  })

  it('forwards all other props to the base component', () => {
    expectReactShallow(
      <Block foo className='bar'>
        <h1>Test</h1>
      </Block>
    ).to.have.rendered(
      <Base foo className='bar' type='grid-block'>
        <h1>Test</h1>
      </Base>
    )
  })
})
