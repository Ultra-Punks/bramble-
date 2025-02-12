import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  SinglePostView,
  Map,
  AllProfiles,
  ProfileView,
  SingleComment,
  SingleLocation,
  SingleLocationView,
  AddLocationForm,
  LandingPage,
  EditProfile
} from './components'
import Test from './components/test'
import CommunitySearch from './components/communitySearch'
import {me} from './store'
import CommunityProfile from './components/communityProfile'

import AddCommentForm from './components/AddCommentForm'

import Footer from './components/Footer'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div className="Routes-Container">
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path="/login" component={withRouter(Login)} />
          <Route path="/signup" component={withRouter(Signup)} />
          <Route path="/map" component={withRouter(Map)} />
          <Route exact path="/" component={withRouter(LandingPage)} />
          <Route
            exact
            path="/post/addComment/:id"
            component={withRouter(AddCommentForm)}
          />

          {/* <Route exact path="/l/add" component={AddLocationForm} /> */}
          <Route path="/l/:id" component={SingleLocation} />
          <Route path="/test" component={Test} />
          <Route
            exact
            path="/community"
            component={withRouter(CommunitySearch)}
          />
          <Route
            exact
            path="/community/list/:id"
            component={withRouter(CommunityProfile)}
          />
          <Route exact path="/u" component={AllProfiles} />
          <Route
            exact
            path="/u/:username"
            component={withRouter(ProfileView)}
          />
          <Route path="/p/:postId" component={withRouter(SinglePostView)} />
          <Route path="/comments/:commentId" component={SingleComment} />

          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
              <Route path="/edit-profile" component={EditProfile} />
            </Switch>
          )}
          {/* Displays our Login component as a fallback */}
        </Switch>
        <br />
        <br />
        <Route path="/" component={Footer} />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
