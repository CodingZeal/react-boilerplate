import React from 'react'
import expectReactShallow from 'expect-react-shallow'

import Header from '..'
import styles from '../styles.scss'
import shallowRender from 'utils/shallowRender'

describe('Header', () => {
  function className(component) {
    return shallowRender(component).props.className
  }

  test('renders the root element as a div by default', () => {
    expectReactShallow(<Header />)
      .to.have.rendered(<h1 />)
  })

  test('renders header with the "heading" class', () => {
    expect(className(<Header />)).toContain(styles.heading)
  })
})
