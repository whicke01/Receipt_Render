import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import ReceiptHome from './ReceiptHome'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={ReceiptHome} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
