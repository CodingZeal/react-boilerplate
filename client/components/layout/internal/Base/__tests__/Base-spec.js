import React from 'react'
import expectReactShallow from 'expect-react-shallow'

import Base from '..'

describe('Base', () => {
  it('renders the root element as a div by default', () => {
    expectReactShallow(<Base type='grid-block' />)
      .to.have.rendered(<div></div>)
  })

  it('renders the root element specified by elementType', () => {
    expectReactShallow(<Base elementType='span' type='grid-block' />)
      .to.have.rendered(<span></span>)
  })

  it('renders children within the root element', () => {
    expectReactShallow(<Base children={<h1>Test</h1>} type='grid-block' />)
      .to.have.rendered(<div><h1>Test</h1></div>)
  })

  it('converts the type prop to a foundation class name', () => {
    expectReactShallow(<Base type='grid-block' />)
      .to.have.exactly.rendered(<div className='grid-block' />)
  })

  it('converts the align prop to a foundation class name', () => {
    expectReactShallow(<Base align='right' type='grid-block' />)
      .to.have.rendered(<div className='grid-block align-right' />)

    expectReactShallow(<Base align='left' type='grid-block' />)
      .to.have.rendered(<div className='grid-block align-left' />)
  })

  it('converts the shrink prop to a foundation class name', () => {
    expectReactShallow(<Base shrink type='grid-block' />)
      .to.have.rendered(<div className='grid-block shrink' />)
  })

  it('converts the vertical prop to a foundation class name', () => {
    expectReactShallow(<Base vertical type='grid-block' />)
      .to.have.rendered(<div className='grid-block vertical' />)
  })

  it('combines multiple props into the correct foundation classes', () => {
    expectReactShallow(
      <Base shrink vertical align='right' type='grid-block' />
    ).to.have.rendered(
      <div className='grid-block align-right shrink vertical' />
    )
  })

  it('merges the provided className with generated foundation classes', () => {
    expectReactShallow(
      <Base align='right' className='foo bar' type='grid-block' />
    ).to.have.rendered(
      <div className='grid-block foo bar align-right' />
    )
  })
})
