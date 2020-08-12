import React from 'react';
import Header from './Components/Header'
import InstructorContainer from './Containers/InstructorContainer'
import './App.css';
import AnimeContainer from './Containers/AnimeContainer';
import Welcome from './Components/Welcome';
import { Route, Switch, withRouter } from 'react-router-dom'
import Navbar from './Components/Navbar';
import Signup from './Components/Signup';


// fetch("http://localhost:3000/api/v1/users", {
//   method: "POST",
//   headers: { accepts: "application/json", "content-type": "application/json" },
//   body: JSON.stringify({ "username": "Tashawn", "password": "1234" })

// }).then(function (response) { return response.json() }).then(function (data) { console.log(data) })





class App extends React.Component {

  state = {
    instructor: {},
    user: {}
  }

  componentDidMount() {
    const token = localStorage.getItem("token")
    if (token) {
      fetch("http://localhost:3000/api/v1/profile", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
    } else {
      this.props.history.push("/signup")
    }
  }

  appClickHandler = (instructor_obj) => {
    this.setState({ instructor: instructor_obj })
  }

  signupHandler = (info) => {
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        accepts: "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({ user: info })
    })
      .then(resp => resp.json())
      .then(console.log)
  }

  render() {
    return (
      <>
        <Navbar />
        <Header />

        <Switch>
          <Route path="/signup" render={() => <Signup submitHandler={this.signupHandler} />} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/anime" render={() => <AnimeContainer instructor={this.state.instructor} />} />
          <Route path="/instructors" render={() => <InstructorContainer appClickHandler={this.appClickHandler} />} />
        </Switch>
      </>
    );
  }
}






export default withRouter(App);
