import React from 'react'
import { NavLink } from 'react-router-dom'


class Instructor extends React.Component {

    instructorClickHandler = () => {
        this.props.appClickHandler(this.props.instructor)
    }

    render() {
        return (
            <NavLink to={`/instructors/${this.props.instructor.id}`}>
                <p onClick={this.instructorClickHandler}>{this.props.instructor.name}</p>
            </NavLink>
        )



    }

}

export default Instructor