/* eslint-disable complexity */
import React from 'react'
import {Modal, Image} from 'react-bootstrap'
import history from '../history'

function ShowInfo(props) {
  const {profile} = props
  if (
    profile !== undefined &&
    profile.subscriber !== undefined &&
    profile.subscriber.length
  ) {
    const communities = profile.subscriber
    return (
      <div>
        {communities.map(community => {
          return (
            <div
              className="profile-preview-container"
              key={community.id}
              onClick={() => history.push(`/community/list/${community.id}`)}
            >
              <Image
                className="post-pfp"
                src={community.profileImg}
                roundedCircle
              />
              <div className="profile-preview">
                <div className="profile-preview-handle">
                  <p className="profile-preview-name text-hover">
                    {community.name}
                  </p>
                </div>
                <p>{community.description}</p>
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

class ShowSubscriptions extends React.Component {
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
            {this.props.profile.name}'s communities
          </h1>
          <ShowInfo className="testing" profile={this.props.profile} />
        </div>
      </Modal>
    )
  }
}

export default ShowSubscriptions
