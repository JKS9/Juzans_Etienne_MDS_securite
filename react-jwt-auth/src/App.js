import React, { Component } from "react"
import { Switch, Route, Link} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

import AuthService from "./services/auth.service"

import Login from "./components/login.component"
import Home from "./components/home.component"
import NotFound from "./components/notFound.component"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: null,
      showUserBoard: false,
    }
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser()

    if (user === true) {
      this.setState({
        currentUser: user,
        showUserBoard: true
      })
    }
  }



  render() {

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Home
          </Link>
          <div className="navbar-nav mr-auto">
            
          </div>
        </nav>

        <div className="container mt3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home}/>
            <Route exact path="/Login" component={Login}/>
            <Route path="*" component={NotFound}/>
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;
