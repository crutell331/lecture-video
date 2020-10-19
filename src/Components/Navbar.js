import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar(props) {
    return (
        <ul>
            <NavLink to="/welcome">
                <li>Welcome</li>
            </NavLink>
            <NavLink to="/instructors">
                <li>All Instructors</li>
            </NavLink>
            <NavLink to="/anime">
                <li>Anime</li>
            </NavLink>
            <NavLink to="/instructors/create">
                <li>Add Instructor</li>
            </NavLink>
            <NavLink to="/signup">
                <li>Create an Account</li>
            </NavLink>

            {props.user ? <li onClick={props.clickHandler}>Log Out</li> :
                <NavLink to="/login">
                    <li>Log In</li>
                </NavLink>
            }
        </ul>
    )
}

export default Navbar