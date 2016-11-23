import React, { PropTypes } from 'react'
import 'foundation-apps/dist/css/foundation-apps.css'
import { Link } from 'react-router'

import { Block, Content } from 'modules/layout'
import { Header } from 'modules/sample'
import { navigateTo } from 'utils/navigation'

const propTypes = {
  children: PropTypes.element
}

function handleAboutUsOnClick() {
  navigateTo('about')
}

export default function App({ children }) {
  return (
    <div>
      <Header />
      <Block>
        <Content>
          <ul>
            <li><Link to='about'>Link About</Link></li>
            <li>
              <button onClick={handleAboutUsOnClick}>Push About Us</button>
            </li>
          </ul>
        </Content>
      </Block>

      {children}
    </div>
  )
}

App.propTypes = propTypes
