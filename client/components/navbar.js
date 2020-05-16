import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Image, Button} from 'react-bootstrap'
import {AddPost, Map, SignupButton} from './index'

const Navbar = ({handleClick, isLoggedIn, user}) => {
  const [modalShow, setModalShow] = React.useState(false)
  const [signupShow, setSignupShow] = React.useState(false)
  return (
    <div className="nav-container">
      <div className="nav-group">
        <Link to="/">
          <p className="nav-title">Bramble</p>
        </Link>
      </div>
      <Link to="/map">
        <Image
          className="nav-logo"
          src="https://cdn0.iconfinder.com/data/icons/kirrkle-maps-and-navigation/60/10_-_Map_marker-512.png"
          roundedCircle
        />
      </Link>
      <div className="nav-group">
        <nav>
          <div className="signin-signup">
            {isLoggedIn ? (
              <div className="logged-in-container">
                {/* The navbar will show these links after you log in */}
                <Button variant="danger" onClick={() => setModalShow(true)}>
                  Add Post
                </Button>
                <AddPost
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  user={user}
                />

                <Link to="/home">Home</Link>
                <Link to="/community">Community</Link>
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
                <Image
                  className="nav-logo"
                  src={user.profileImg}
                  roundedCircle
                />
              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <Link to="/login">Login</Link>
                <Link to="/community">Community</Link>

                <Button onClick={() => setSignupShow(true)}>Signup</Button>
                <SignupButton
                  show={signupShow}
                  onHide={() => setSignupShow(false)}
                />
                {/* <Link to="/signup">Sign Up</Link> */}
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
