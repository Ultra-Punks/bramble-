import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store'
import {InputGroup, Form} from 'react-bootstrap'
import {AwesomeButton} from 'react-awesome-button'

const LoginForm = props => {
  const {name, handleSubmit, error} = props
  return (
    <div>
      <p className="create-account-text">Log in to Bramble</p>
      <form onSubmit={handleSubmit} name={name}>
        <div className="signup-container">
          <div className="first-input">
            <Form.Label htmlFor="username" className="signup-label">
              Username
            </Form.Label>
            <div className="signup-username">
              <InputGroup.Text id="basic-addon1" className="radius">
                @
              </InputGroup.Text>
              <Form.Control
                className="signup-input input-radius"
                type="text"
                placeholder="Enter username"
                name="username"
              />
            </div>
          </div>
          <div>
            <Form.Label htmlFor="password" className="signup-label">
              Password
            </Form.Label>
            <Form.Control
              className="signup-input"
              type="password"
              placeholder="Enter password"
              name="password"
            />
          </div>
          <div>
            <AwesomeButton type="primary">Login</AwesomeButton>
          </div>
        </div>

        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

const mapState = state => {
  return {
    name: 'login',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const password = evt.target.password.value
      const username = evt.target.username.value
      dispatch(auth(null, password, 'login', null, username))
    }
  }
}

export default connect(mapState, mapDispatch)(LoginForm)
