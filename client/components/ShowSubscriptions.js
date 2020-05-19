/* eslint-disable complexity */
import React from 'react'
import {Modal, Image} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function ShowInfo(props) {
  const {profile} = props
  console.log('THIS IS PROFILE', profile)
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
            <div key={community.id}>
              <Image
                className="post-pfp"
                src={community.profileImg}
                roundedCircle
              />
              <Link to={`/community/list/${community.id}`}>
                <p>{community.name}</p>
              </Link>
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
        <ShowInfo profile={this.props.profile} />
      </Modal>
    )
  }
}

export default ShowSubscriptions
