import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Router, Route, Switch, Link } from 'react-router-dom'
import { Provider } from 'react-redux'
import CharSheet from './App'
import SpellPage from './spell-page'
import './root.css'

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <div className="container">
        <div>
          <Link className="nav-link" to="/">Character Sheet</Link>
          <Link className="nav-link" to="/spells">Spells</Link>
        </div>
        <Switch>
          <Route exact path="/" component={CharSheet} />
          <Route path="/spells" component={SpellPage} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
