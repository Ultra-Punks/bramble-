import React, {Component} from 'react'
import {connect} from 'react-redux'
import history from '../history'
import {AwesomeButton} from 'react-awesome-button'
import {fetchRandomCommunities} from '../store/allCommunities'

class LandingPage extends Component {
  constructor() {
    super()
    this.randomCommunityIds = this.randomCommunityIds.bind(this)
  }

  componentDidMount() {
    let arrOfIds = this.randomCommunityIds()
    this.props.getRandomCommunities(arrOfIds)
  }

  randomCommunityIds() {
    var arr = []
    while (arr.length < 3) {
      var r = Math.floor(Math.random() * 10) + 1
      if (arr.indexOf(r) === -1) arr.push(r)
    }
    return arr
  }

  render() {
    const randomCommunities = this.props.communities

    return (
      <div className="landingPage">
        <div className="welcomePhotoContainer">
          <img
            src="https://res.cloudinary.com/bramble/image/upload/v1590192370/user_uploads/landing-page_copy_pxdnkp.png"
            className="welcomePhoto"
          />
        </div>
        <div className="introContainer">
          <div className="welcomePageContent">
            <h2 className="community-discover">
              Discover the things you love.
              <br />
              Check out a Bramble community to see what's happening in your
              area.
            </h2>
            <div className="samplesDisplay">
              {Array.isArray(randomCommunities) &&
                randomCommunities.map(community => {
                  return (
                    <div key={community.id} className="community-cards-item">
                      <div className="community-card">
                        <img
                          src={community.profileImg}
                          className="community-card-image"
                        />
                        <div className="community-card-content">
                          <div className="community-card-title">
                            {community.name}
                          </div>
                          <div className="community-card-text">
                            {community.description}
                          </div>
                          <div className="community-button">
                            <AwesomeButton
                              type="primary"
                              onPress={() =>
                                history.push(`/Community/list/${community.id}`)
                              }
                            >
                              View
                            </AwesomeButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapToState = state => {
  return {
    communities: state.allCommunities,
    profiles: state.profiles,
    posts: state.singlePost
  }
}

const mapToDispatch = dispatch => {
  return {
    getRandomCommunities: arrOfIds => dispatch(fetchRandomCommunities(arrOfIds))
  }
}

export default connect(mapToState, mapToDispatch)(LandingPage)
