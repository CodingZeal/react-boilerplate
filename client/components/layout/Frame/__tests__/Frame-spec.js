import '__tests__/specHelper'
import React from 'react'
import expectReactShallow from 'expect-react-shallow'

import Base from '../../internal/Base'
import Frame from '..'

describe('Frame', () => {
  it('uses a Base with type of grid-frame', () => {
    expectReactShallow(<Frame />)
      .to.have.rendered(<Base type='grid-frame' />)
  })

  it('forwards all other props to the base component', () => {
    expectReactShallow(
      <Frame foo className='bar'>
        <h1>Test</h1>
      </Frame>
    ).to.have.rendered(
      <Base foo className='bar' type='grid-frame'>
        <h1>Test</h1>
      </Base>
    )
  })
})
