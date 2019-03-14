import React from 'react'
import ReactDOM from 'react-dom'
import { render } from 'react-testing-library'
import App from './App'
import ShallowRenderer from 'react-test-renderer/shallow'
import Info from './components/infoComponent'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('Check for header "Weather Forecast"', () => {
  const { getByText } = render(<App />)
  expect(getByText('Weather Forecast'))
})

it('renders info component', () => {
  const renderer = new ShallowRenderer()
  renderer.render(<Info />)
  const result = renderer.getRenderOutput()
  expect(result.type).toBe('div')
})
