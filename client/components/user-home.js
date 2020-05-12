import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'

// import the thunk here...
import {fetchUsers} from '../store/profile'

class UserHome extends React.Component {
  componentDidMount() {
    this.props.fetchUsers()
  }
  // const UserHome = (props) => {
  render() {
    console.log('props>>>>', this.props)

    return (
      <div>
        <p>Users</p>
        {this.props.profiles ? (
          this.props.profiles.map(user => {
            return <p>{user.username}</p>
          })
        ) : (
          <p>'loading'</p>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    profiles: state.profiles
  }
}

const mapDispatch = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers())
})

export default connect(mapState, mapDispatch)(UserHome)
