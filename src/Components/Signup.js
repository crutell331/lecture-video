import React from 'react'

class Signup extends React.Component {
    state = {
        username: "",
        password: ""
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    submitHandler = (e) => {
        e.preventDefault()
        this.props.submitHandler(this.state)
    }
    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.changeHandler} />
                <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.changeHandler} />
                <input type="submit" value="sign up" />
            </form>
        )
    }
}

export default Signup