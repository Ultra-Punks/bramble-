import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {AllProfiles} from './index'  // TESTER COMP ONLY...

// bring in thunks here
import {fetchOneCommunity} from '../store/community'
import {fetchUsers} from '../store/allProfiles'
import {fetchUserPosts} from '../store/userFeed'
import {fetchRandomCommunities} from '../store/allCommunities'

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
    this.randomCommunityIds = this.randomCommunityIds.bind(this)
  }

  componentDidMount() {
    // this.props.fetchCommunity(this.state.community)
    this.props.fetchUsers()

    let arrOfIds = this.randomCommunityIds()
    this.props.getRandomCommunities(arrOfIds)
    // const username = this.props.match.params.username
    // this.props.fetchUserPosts(username)
  }

  randomCommunityIds() {
    var arr = []
    while (arr.length < 4) {
      var r = Math.floor(Math.random() * 10) + 1
      if (arr.indexOf(r) === -1) arr.push(r)
    }
    return arr
  }

  randomDisplay() {
    // create an array of sample communities
    const sampleCommunities = []

    if (this.props.community.length) {
      const randomOne = this.props.community[
        getRandomInt(0, this.props.community.length - 1)
      ]
      let randomTwo = this.props.community[
        getRandomInt(0, this.props.community.length - 1)
      ]
      // if the id on randomOne matches randomTwo
      if (randomOne.id === randomTwo.id) {
        randomTwo = this.props.community[
          getRandomInt(0, this.props.community.length - 1)
        ]
      }
      let randomThree = this.props.community[
        getRandomInt(0, this.props.community.length - 1)
      ]
      // if the id on randomThree matches randomOne or randomTwo
      if (randomOne.id === randomTwo.id && randomOne.id === randomThree.id) {
        randomThree = this.props.community[
          getRandomInt(0, this.props.community.length - 1)
        ]
      }
      sampleCommunities.push(randomOne, randomTwo, randomThree)

      return sampleCommunities
    } else {
      return false
    }
  }

  render() {
    // console.log('this.props>>>>>', this.props)
    this.randomCommunityIds()
    // const samplesComms = this.randomDisplay()
    const randomCommunities = this.props.communities
    return (
      <div className="landingPage">
        <div className="welcomePhotoContainer">
          <img src={option1} className="welcomePhoto" />
        </div>
        <div className="introContainer">
          <div className="welcomePageContent">
            <h2>
              Discover the things you love. Check out a Bramble community to see
              what's happening in your area.
            </h2>
            <div className="samplesDisplay">
              {Array.isArray(randomCommunities) &&
                randomCommunities.map(singleCommunity => {
                  return (
                    <div key={singleCommunity.id} className="sampleContainer">
                      <img
                        src={singleCommunity.profileImg}
                        className="community-card-image"
                      />

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
      </div>
    )
  }
}

const mapToState = state => {
  return {
    communities: state.allCommunities,
    profiles: state.profiles
    // posts: state.userPosts,
  }
}

const mapToDispatch = dispatch => {
  return {
    getRandomCommunities: arrOfIds =>
      dispatch(fetchRandomCommunities(arrOfIds)),
    fetchUsers: () => dispatch(fetchUsers())
    // fetchUserPosts: (username) => dispatch(fetchUserPosts(username)),
  }
}

export default connect(mapToState, mapToDispatch)(LandingPage)
