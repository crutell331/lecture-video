import React from 'react';
import Header from './Components/Header'
import InstructorContainer from './Containers/InstructorContainer'
import './App.css';
import AnimeContainer from './Containers/AnimeContainer';
import Welcome from './Components/Welcome';
import { Route, Switch, withRouter } from 'react-router-dom'
import Navbar from './Components/Navbar';
import Signup from './Components/Signup';
import Login from './Components/Login';

class App extends React.Component {

  state = {
    instructor: {},
    user: null,
  }

  componentDidMount() {
    const token = localStorage.getItem("token")
    if (token) {
      fetch("http://localhost:3000/api/v1/profile", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(resp => resp.json())
        .then(data => this.setState({ user: data.user }))
    } else {
      this.props.history.push("/login")
    }
  }

  appClickHandler = (instructor_obj) => {
    this.setState({ instructor: instructor_obj })
  }

  signupHandler = (userObj) => {
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        accepts: "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({ user: userObj })
    })
      .then(resp => resp.json())
      .then(data => this.setState({ user: data.user }))
  }

  loginHandler = (userInfo) => {
    console.log("logging in", userInfo)
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        accepts: "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({ user: userInfo })
    })
      .then(resp => resp.json())
      .then(data => {

        console.log("token: ", data.jwt)
        // localStorage.setItem("token", data.jwt)
        this.setState({ user: data.user }, () => this.props.history.push("/instructors"))
      })
  }

  logOutHandler = () => {
    localStorage.removeItem("token")
    this.props.history.push("/login")
    this.setState({ user: null })
  }

  render() {
    return (
      <>
        <Navbar user={this.state.user} clickHandler={this.logOutHandler} />
        <Header />

        <Switch>
          <Route path="/login" render={() => <Login submitHandler={this.loginHandler} />} />
          <Route path="/signup" render={() => <Signup submitHandler={this.signupHandler} />} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/anime" render={() => <AnimeContainer user={this.state.user} instructor={this.state.instructor} />} />
          <Route path="/instructors" render={() => <InstructorContainer user={this.state.user} appClickHandler={this.appClickHandler} />} />
        </Switch>
      </>
    );
  }
}






export default withRouter(App);
