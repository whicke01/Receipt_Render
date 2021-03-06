import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import ReceiptHome from './ReceiptHome'
import ReceiptForm from './ReceiptForm'
import ItemIndex from './ItemIndex'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={'/'} component={ReceiptHome}/>
        <Route exact path={`/receipt`} conponent={ReceiptHome}/>
        <Route exact path={`/receipt/new`} component={ReceiptForm}/>
        <Route exact path={`/receipt/new/:id`} component={ReceiptForm} />
        <Route exact path={`/receipt/:id`} component={ItemIndex} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
