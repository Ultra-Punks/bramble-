import React from 'react'
import {Button} from 'react-bootstrap'

function DisplayFollowUnfollow(props) {
  const {following, followUser, username, unfollowUser} = props
  if (following) {
    return (
      <Button
        className="follow-button"
        variant="outline-light"
        onClick={() => unfollowUser(username)}
      >
        Unfollow
      </Button>
    )
  } else {
    return (
      <Button
        className="follow-button"
        variant="outline-light"
        onClick={() => {
          followUser(username)
        }}
      >
        Follow
      </Button>
    )
  }
}

export default DisplayFollowUnfollow
