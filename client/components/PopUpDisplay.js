/* eslint-disable complexity */
import React from 'react'
import {Modal, Image} from 'react-bootstrap'
import history from '../history'

function ShowInfo(props) {
  const {profile} = props
  if (
    profile !== undefined &&
    profile.follower !== undefined &&
    profile.follower.length
  ) {
    return (
      <div>
        {profile.follower.map(user => {
          return (
            <div
              className="profile-preview-container"
              key={user.id}
              onClick={() => history.push(`/u/${user.username}`)}
            >
              <Image className="post-pfp" src={user.profileImg} roundedCircle />
              <div className="profile-preview">
                <div className="profile-preview-handle">
                  <p className="profile-preview-name text-hover">{user.name}</p>
                  <p className="profile-preview-username text-hover">
                    @{user.username}
                  </p>
                </div>
                <p>{user.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    )
  } else {
    return <div />
  }
}

class PopUpDisplay extends React.Component {
  render() {
    return (
      <Modal
        onHide={this.props.onHide}
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="following-container">
          <h1 className="following-header">
            {this.props.profile.name}'s followers
          </h1>
          <ShowInfo profile={this.props.profile} />
        </div>
      </Modal>
    )
  }
}

export default PopUpDisplay
