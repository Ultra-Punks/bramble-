import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'

// import the thunk here...
import {fetchUsers} from '../store/profile'

// ==========================================================
// ====== vvvv LOGIN INFORMATION FROM BOILERMAKER  vvvv =====
// /**
//  * COMPONENT
//  */
// export const UserHome = (props) => {
//   const {email} = props

//   return (
//     <div>
//       <h3>Welcome, {email}</h3>
//     </div>
//   )
// }

class UserHome extends React.Component {
  componentDidMount() {
    this.props.fetchUsers()
  }
  // const UserHome = (props) => {
  render() {
    console.log('props>>>>', this.props)

    return (
      <div>
        {Array.isArray(this.props.profiles)
          ? console.log(this.props.profiles)
          : console.log('loading')}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // user: state.user,
    profiles: state.profiles
  }
  // return {
  //   email: state.user.email
  // }
}

const mapDispatch = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers())
})

export default connect(mapState, mapDispatch)(UserHome)

// ==========================================================
/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string,
// }
// ====== ^^^^ LOGIN INFORMATION FROM BOILERMAKER ^^^^ ======
// ==========================================================
