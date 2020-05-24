import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllCommunities, fetchOneCommunity} from '../store/allCommunities'
import history from '../history'
import {AwesomeButton} from 'react-awesome-button'

class CommunitySearch extends React.Component {
  constructor() {
    super()
    this.state = {
      community: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchCommunites()
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleKeyPress = () => {
    this.props.fetchOneCommunity(this.state.community)
  }

  handleSubmit() {
    event.preventDefault()
    this.props.fetchOneCommunity(this.state.community)
  }

  searchResults() {
    const community = this.props.allCommunities

    if (community) {
      if (Array.isArray(community)) {
        return (
          <div className="community-cards">
            {community.map(result => {
              return (
                <div key={result.id} className="community-cards-item">
                  <div className="community-card">
                    <img
                      src={result.profileImg}
                      className="community-card-image"
                    />
                    <div className="community-card-content">
                      <div className="community-card-title">{result.name}</div>
                      <div className="community-card-text">
                        {result.description}
                      </div>
                      <div className="community-button">
                        <AwesomeButton
                          type="primary"
                          onPress={() =>
                            history.push(`/Community/list/${result.id}`)
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
        )
      }
    } else return <div>No Results</div>
  }

  render() {
    return (
      <div>
        <div className="communityPic">
          <div className="community-first-container">
            <p className="community-search-title">Find your community</p>
          </div>
          <div className="community-second-container">
            <form onSubmit={this.handleSubmit}>
              <input
                className="searchbar"
                name="community"
                type="text"
                onChange={this.handleChange}
                onKeyUp={this.handleKeyPress}
                value={this.state.community}
              />
              <button className="searchCommunitybutton" type="submit">
                <img
                  src="https://image.flaticon.com/icons/svg/1086/1086933.svg"
                  className="community-magPic"
                />
              </button>
            </form>
            <img
              src="https://youmatter.world/app/uploads/sites/2/2020/03/coronavirus-bad-ecology.jpg"
              className="communitySinglePix"
            />
          </div>
        </div>

        <div>{this.searchResults()}</div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    allCommunities: state.allCommunities
  }
}

const mapDispatch = dispatch => ({
  fetchCommunites: () => dispatch(fetchAllCommunities()),
  fetchOneCommunity: name => dispatch(fetchOneCommunity(name))
})

const CommunityPage = connect(mapState, mapDispatch)(CommunitySearch)

export default CommunityPage
