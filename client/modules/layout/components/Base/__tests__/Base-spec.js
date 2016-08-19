import React from 'react'
import expectReactShallow from 'expect-react-shallow'

import shallowRender from 'utils/shallowRender'
import Base from '..'

describe('Base', () => {
  function className(component) {
    return shallowRender(component).props.className
  }

  it('renders the root element as a div by default', () => {
    expectReactShallow(<Base type='grid-block' />)
      .to.have.rendered(<div />)
  })

  it('renders the root element specified by elementType', () => {
    expectReactShallow(<Base elementType='span' type='grid-block' />)
      .to.have.rendered(<span />)
  })

  it('renders children within the root element', () => {
    expectReactShallow(<Base children={<h1>Test</h1>} type='grid-block' />)
      .to.have.rendered(<div><h1>Test</h1></div>)
  })

  it('converts the type prop to a foundation class name', () => {
    expect(className(<Base type='grid-block' />)).to.include('grid-block')
  })

  it('converts the align prop to a foundation class name', () => {
    expect(className(<Base align='right' type='grid-block' />))
      .to.include('align-right')

    expect(className(<Base align='left' type='grid-block' />))
      .to.include('align-left')
  })

  it('converts the shrink prop to a foundation class name', () => {
    expect(className(<Base shrink type='grid-block' />))
      .to.include('shrink')
  })

  it('converts the vertical prop to a foundation class name', () => {
    expect(className(<Base vertical type='grid-block' />))
      .to.include('vertical')
  })

  it('combines multiple props into the correct foundation classes', () => {
    expect(className(<Base shrink vertical align='right' type='grid-block' />))
      .to.include('align-right shrink vertical')
  })

  it('merges the provided className with generated foundation classes', () => {
    expect(className(
      <Base align='right' className='foo bar' type='grid-block' />
    )).to.eq('grid-block foo bar align-right')
  })
})
