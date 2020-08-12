import React from 'react'

class Form extends React.Component {

    state = {
        name: "",
        mod: ""
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })

    }

    render() {

        return (
            <form onSubmit={(e) => {
                e.preventDefault()
                this.props.submitHandler(this.state)
                this.setState({ name: "", mod: "" })
            }}>
                <input type="text" name="name" placeholder="enter instructor name" value={this.state.name} onChange={this.changeHandler} />
                <input type="number" name="mod" placeholder="enter mod number" value={this.state.mod} onChange={this.changeHandler} />
                <input type="submit" value="create instructor" />
            </form>
        )
    }
}

// Uncontrolled Component

export default Form