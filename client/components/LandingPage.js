import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {AllProfiles} from './index'  // TESTER COMP ONLY...

// bring in thunks here
import {fetchOneCommunity} from '../store/community'
import {fetchUsers} from '../store/allProfiles'
import {fetchUserPosts} from '../store/userFeed'
import {fetchRandomCommunities} from '../store/allCommunities'
import {fetchAllPosts, fetchRandomPosts} from '../store/singlePost'

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
    this.randomCommunityIds = this.randomCommunityIds.bind(this)
    this.randomPosts = this.randomPosts.bind(this)
  }

  componentDidMount() {
    // this.props.fetchCommunity(this.state.community)
    this.props.fetchUsers()
    this.props.fetchAllPosts()
    let arrOfIds = this.randomCommunityIds()
    this.props.getRandomCommunities(arrOfIds)
    let arrayOfPostIds = this.randomPosts()
    this.props.getRandomPosts(arrayOfPostIds)
  }

  randomCommunityIds() {
    var arr = []
    while (arr.length < 4) {
      var r = Math.floor(Math.random() * 10) + 1
      if (arr.indexOf(r) === -1) arr.push(r)
    }
    return arr
  }

  randomPosts() {
    var newArr = []
    while (newArr.length < 6) {
      var r = Math.floor(Math.random() * 10) + 1
      if (newArr.indexOf(r) === -1) newArr.push(r)
    }
    return newArr
  }

  render() {
    this.randomCommunityIds()
    const randomCommunities = this.props.communities

    this.randomPosts()
    const randomPosts = this.props.posts

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
                      <Link to={`/community/list/${singleCommunity.id}`}>
                        <div>
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
                      </Link>
                    </div>
                  )
                })}
            </div>
            <h2>Check out what the Bramblers are talking about.</h2>
            <div className="samplePostsContainer">
              {Array.isArray(randomPosts) &&
                randomPosts.map(post => {
                  return <div key={post.id}>{post.description}</div>
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

const mapToDispatch = (dispatch, ownProps) => {
  return {
    getRandomPosts: arrOfIds => dispatch(fetchRandomPosts(arrOfIds)),
    getRandomCommunities: arrOfIds =>
      dispatch(fetchRandomCommunities(arrOfIds)),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchAllPosts: () => dispatch(fetchAllPosts())
  }
}

export default connect(mapToState, mapToDispatch)(LandingPage)
