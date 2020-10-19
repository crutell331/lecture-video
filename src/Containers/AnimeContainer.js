import React from 'react'
import { Redirect } from 'react-router-dom'
import Instructor from '../Components/Instructor'

function AnimeContainer(props) {
    // let instructors = props.instructors.map(instructorObj => <Instructor instructor={instructorObj} />)
    return (
        <>
            {props.user ?

                <>
                    <h1>Anime Container</h1>
                    <Instructor instructor={props.instructor} />
                </>
                :
                <Redirect to="/welcome" />

            }
        </>


    )
}

export default AnimeContainer