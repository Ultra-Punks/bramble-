/* eslint-disable complexity */
import React from 'react'
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
        <ShowInfo community={this.props.community} />
      </Modal>
    )
  }
}

export default ShowMembers
