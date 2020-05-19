import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {AllProfiles} from './index'  // TESTER COMP ONLY...

// bring in thunks here
import {fetchOneCommunity} from '../store/community'
import {fetchUsers} from '../store/allProfiles'
import {fetchUserPosts} from '../store/userFeed'

// -----------------------------------------------------------
// -----------------------------------------------------------
// few ideas for landing page:
const option1 =
  'https://d39l2hkdp2esp1.cloudfront.net/img/photo/122786/122786_00_2x.jpg'
const option2 =
  'https://avsmindfulness.com/wp-content/uploads/2018/03/5-Health-Benefits-of-Socialization-1.jpg'
const option3 =
  'https://www.elikarealestate.com/blog/wp-content/uploads/2018/02/millennials.jpeg'
// -----------------------------------------------------------
// -----------------------------------------------------------

// define a helper function to get a random number!
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive}
}

class LandingPage extends Component {
  constructor() {
    super()
    this.state = {
      community: ''
    }
    this.randomDisplay = this.randomDisplay.bind(this)
  }

  componentDidMount() {
    this.props.fetchCommunity(this.state.community)
    this.props.fetchUsers()
    // const username = this.props.match.params.username
    // this.props.fetchUserPosts(username)
  }

  randomDisplay() {
    // create an array of sample communities
    const sampleCommunities = []
    console.log('in random display', this.props.community)

    if (this.props.community.length) {
      const randomOne = this.props.community[
        getRandomInt(0, this.props.community.length - 1)
      ]
      const randomTwo = this.props.community[
        getRandomInt(0, this.props.community.length - 1)
      ]
      const randomThree = this.props.community[
        getRandomInt(0, this.props.community.length - 1)
      ]
      sampleCommunities.push(randomOne, randomTwo, randomThree)

      return sampleCommunities
    } else {
      return false
    }
  }

  render() {
    console.log('this.props>>>>>', this.props)
    const samplesComms = this.randomDisplay()
    return (
      <div className="landingPage">
        <div className="welcomePhotoContainer">
          <img src={option1} className="welcomePhoto" />
        </div>
        <div className="welcomePageContent">
          <h2>
            Discover and Share the Things you Love. Check out a Bramble
            community or create your own!
          </h2>
          <div>
            {Array.isArray(samplesComms) &&
              samplesComms.map(singleCommunity => {
                return (
                  <div key={singleCommunity.id} className="sampleContainer">
                    <img src={singleCommunity.profileImg} />

                    <div className="community-card-content">
                      <div className="community-card-title">
                        {singleCommunity.name}
                      </div>
                      <div className="community-card-text">
                        {singleCommunity.description}
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    )
  }
}

const mapToState = state => {
  return {
    community: state.community,
    profiles: state.profiles
    // posts: state.userPosts,
  }
}

const mapToDispatch = (dispatch, ownProps) => {
  return {
    fetchCommunity: name => dispatch(fetchOneCommunity(name)),
    fetchUsers: () => dispatch(fetchUsers())
    // fetchUserPosts: (username) => dispatch(fetchUserPosts(username)),
  }
}

export default connect(mapToState, mapToDispatch)(LandingPage)
