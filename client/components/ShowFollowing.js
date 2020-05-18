/* eslint-disable complexity */
import React from 'react'
import {Modal, Image} from 'react-bootstrap'

function ShowInfo(props) {
  const {profile} = props
  if (
    profile !== undefined &&
    profile.following !== undefined &&
    profile.following.length
  ) {
    return (
      <div>
        {profile.following.map(user => {
          return (
            <div key={user.id}>
              <Image className="post-pfp" src={user.profileImg} roundedCircle />
              <p>{user.username}</p>
            </div>
          )
        })}
      </div>
    )
  } else {
    return <div />
  }
}

class ShowFollowing extends React.Component {
  render() {
    return (
      <Modal
        onHide={this.props.onHide}
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ShowInfo profile={this.props.profile} />
      </Modal>
    )
  }
}

export default ShowFollowing
