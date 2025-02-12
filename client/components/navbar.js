import React, {useEffect} from 'react'
import history from '../history'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Image} from 'react-bootstrap'
import {AddPost, SignupButton, LoginButton} from './index'
import LoadingOverlay from 'react-loading-overlay'

const Navbar = props => {
  const {handleClick, isLoggedIn, user} = props

  const [modalShow, setModalShow] = React.useState(false)
  const [signupShow, setSignupShow] = React.useState(false)
  const [loginShow, setLoginShow] = React.useState(false)
  const [isLoading, setLoading] = React.useState(false)

  return (
    <div className="nav-container">
      <div className="nav-group">
        <Link className="nav-text-button" to="/">
          <p className="nav-title">Bramble</p>
        </Link>
      </div>
      {/* {isLoading && (
        <LoadingOverlay active={isLoading} spinner text="Loading post...">
          <p>Some content or children or something.</p>
        </LoadingOverlay>
      )} */}

      <div className="nav-group">
        <nav>
          <div className="signin-signup">
            <Link to="/map">
              <Image
                className="nav-logo"
                src="https://res.cloudinary.com/bramble/image/upload/v1590192635/user_uploads/map_icon_mkn6se.png"
                roundedCircle
              />
            </Link>
            {isLoggedIn ? (
              <div className="logged-in-container">
                {/* The navbar will show these links after you log in */}
                <img
                  className="add-post-nav"
                  src="https://res.cloudinary.com/bramble/image/upload/v1590216347/user_uploads/add_post_j1qlhq.png"
                  onClick={() => setModalShow(true)}
                />
                <AddPost
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  user={user}
                  loading={setLoading}
                />

                <Link className="nav-text-button" to="/home">
                  Home
                </Link>
                <Link className="nav-text-button" to="/u">
                  Search
                </Link>
                <Link className="nav-text-button" to="/community">
                  Communities
                </Link>
                <a className="nav-text-button" href="#" onClick={handleClick}>
                  Logout
                </a>
                <Link className="nav-text-button" to={`/u/${user.username}`}>
                  <Image
                    className="nav-logo"
                    src={user.profileImg}
                    roundedCircle
                  />
                </Link>
              </div>
            ) : (
              <div className="nav-right">
                {/* The navbar will show these links before you log in */}
                {/* <Link to="/login">Login</Link> */}
                <Link to="/community" className="nav-text-button">
                  Communities
                </Link>
                <p
                  className="nav-text-button"
                  onClick={() => setLoginShow(true)}
                >
                  Login
                </p>
                <LoginButton
                  show={loginShow}
                  onHide={() => setLoginShow(false)}
                />
                <p
                  className="nav-text-button"
                  onClick={() => setSignupShow(true)}
                >
                  Signup
                </p>
                <SignupButton
                  show={signupShow}
                  onHide={() => setSignupShow(false)}
                />
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
