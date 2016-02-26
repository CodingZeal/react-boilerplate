import TestUtils from 'react-addons-test-utils'

export default function(component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}
