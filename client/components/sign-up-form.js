import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store'
import {InputGroup, Form, Button} from 'react-bootstrap'

/**
 * COMPONENT
 */
const SignupForm = props => {
  const {name, handleSubmit, error} = props
  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div className="signup-container">
          <div>
            <Form.Label htmlFor="name" className="signup-label">
              Name
            </Form.Label>
            <Form.Control
              className="signup-input"
              type="text"
              placeholder="Enter name"
              name="name"
            />
          </div>
          <div>
            <Form.Label htmlFor="email" className="signup-label">
              Email address
            </Form.Label>
            <Form.Control
              className="signup-input"
              type="email"
              placeholder="Enter email"
              name="email"
            />
            <Form.Text className="text-muted sub">
              We'll never share your email with anyone else.
            </Form.Text>
          </div>
          <div>
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
            <Button
              className="post-button"
              variant="outline-light"
              type="submit"
            >
              Signup
            </Button>
          </div>
        </div>

        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

const mapState = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const email = evt.target.email.value
      const password = evt.target.password.value
      const name = evt.target.name.value
      const username = evt.target.username.value
      dispatch(auth(email, password, 'signup', name, username))
    }
  }
}

export default connect(mapState, mapDispatch)(SignupForm)
