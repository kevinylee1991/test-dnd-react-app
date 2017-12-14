import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import './index.css'
import activeClass from './active-class-reducer'
import Root from './root'

let store = createStore(activeClass)

render(
  <Root store={store} />,
  document.getElementById('root')
)
