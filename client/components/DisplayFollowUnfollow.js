import React from 'react'
import {Button} from 'react-bootstrap'
import {AwesomeButton} from 'react-awesome-button'

function DisplayFollowUnfollow(props) {
  const {following, followUser, username, unfollowUser} = props
  if (following) {
    return (
      <AwesomeButton
        className="follow-button"
        variant="outline-light"
        onPress={() => unfollowUser(username)}
      >
        Unfollow
      </AwesomeButton>
    )
  } else {
    return (
      <AwesomeButton
        className="follow-button"
        variant="outline-light"
        onPress={() => {
          followUser(username)
        }}
      >
        Follow
      </AwesomeButton>
    )
  }
}

export default DisplayFollowUnfollow
