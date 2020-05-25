/* eslint-disable complexity */
import React from 'react'
import history from '../history'
import {Modal, Image} from 'react-bootstrap'

function ShowInfo(props) {
  const {community} = props
  if (
    community !== undefined &&
    community.users !== undefined &&
    community.users.length
  ) {
    return (
      <div>
        {community.users.map(user => {
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

class ShowMembers extends React.Component {
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
          <h1 className="following-header">Members</h1>
          <ShowInfo community={this.props.community} />
        </div>
      </Modal>
    )
  }
}

export default ShowMembers
