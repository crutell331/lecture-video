import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import Instructor from '../Components/Instructor'
import Form from '../Components/Form'
import Search from '../Components/Search'

class InstructorContainer extends React.Component {

    state = {
        instructors: [],
        instructor: {},
        searchValue: ""
    }
    searchHandler = (e) => {
        this.setState({ searchValue: e.target.value })
    }


    componentDidMount() {
        fetch("http://localhost:4000/instructors").then(resp => resp.json()).then(data => this.setState({ instructors: data }))
    }

    filteredInstructors = () => {
        return this.state.instructors.filter(inst => inst.name.toLowerCase().includes(this.state.searchValue.toLowerCase()))
    }

    submitHandler = (obj) => {
        fetch("http://localhost:4000/instructors", {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                accepts: "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(resp => resp.json())
            .then(instructor => {

                this.setState({ instructors: [...this.state.instructors, instructor] }, () => this.props.history.push(`/instructors/${instructor.id}`))
                // push the user to correct path 

            })
    }

    render() {
        return (
            <>
                {this.state.instructors.length === 0 ? <h1>Loading</h1> :

                    <>
                        <Switch>
                            <Route path='/instructors/create' render={() => <Form submitHandler={this.submitHandler} />} />
                            <Route path='/instructors/:id' render={({ match }) => {
                                let id = parseInt(match.params.id)
                                let foundInstructor = this.state.instructors.find((instructor) => instructor.id === id)
                                return <Instructor instructor={foundInstructor} appClickHandler={this.props.appClickHandler} />
                            }} />
                            <Route path="/instructors" render={() => {
                                let instructors = this.filteredInstructors().map(instructorObj => <Instructor key={instructorObj.id} instructor={instructorObj} appClickHandler={this.props.appClickHandler} />)
                                return (
                                    <>
                                        {
                                            this.state.instructors.length === 0 ? <h1>LOADING INSTRUCTORS</h1> :
                                                <>
                                                    <br />
                                                    <Search searchValue={this.state.searchValue} searchHandler={this.searchHandler} />
                                                    {instructors}
                                                </>

                                        }
                                    </>
                                )
                            }} />
                        </Switch>
                    </>
                }
            </>
        )

    }

}

export default withRouter(InstructorContainer)