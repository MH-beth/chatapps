import React from 'react'
import { BrowserRouter as Router , Route , Switch , Redirect } from 'react-router-dom'
import Login from './pages/Login'
import Mesenger from './pages/Mesenger'

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path = "/" component = {Login}/>
          <Route exact path = "/messanger">
            {(sessionStorage.getItem("conn") === "Connected") ? <Mesenger/> : <Login/>}
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
