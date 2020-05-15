import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store'
import {InputGroup} from 'react-bootstrap'

/**
 * COMPONENT
 */
const SignupForm = props => {
  const {name, displayName, handleSubmit, error} = props
  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <div>
            <label htmlFor="name">
              <small>Name</small>
            </label>
            <input name="name" type="text" />
          </div>
          <div>
            <label htmlFor="username">
              <small>Username</small>
            </label>
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            <input name="username" type="text" />
          </div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      {/* <a href="/auth/google">{displayName} with Google</a> */}
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
