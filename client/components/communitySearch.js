import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllCommunities, fetchOneCommunity} from '../store/allCommunities'

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

  handleSubmit() {
    event.preventDefault()
    try {
      this.props.fetchOneCommunity(this.state.community)
      this.setState({
        community: ''
      })
    } catch (error) {
      console.log('error')
    }
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
                        <Link to={`/Community/list/${result.id}`}>
                          <button className="followbutton" type="button">
                            View
                          </button>
                        </Link>
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
        <form onSubmit={this.handleSubmit}>
          <input
            className="searchbar"
            name="community"
            type="text"
            onChange={this.handleChange}
            value={this.state.community}
          />
          <button className="searchCommunitybutton" type="submit">
            <img
              src="https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/245532/58-512.png"
              className="community-magPic"
            />
          </button>
        </form>
        <br />

        <div className="communityPic">
          <img
            src="https://youmatter.world/app/uploads/sites/2/2020/03/coronavirus-bad-ecology.jpg"
            className="communitySinglePix"
          />
        </div>
        <div className="communityText">
          <div className="communityText2">Find Your Community</div>
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
