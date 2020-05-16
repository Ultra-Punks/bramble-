import React from 'react'
import {connect} from 'react-redux'
import {fetchOneCommunity} from '../store/community'
import {Link} from 'react-router-dom'

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
    this.props.fetchOneCommunity(this.state.community)
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
    const community = this.props.community

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
                      <Link
                        to={`/Community/list/${result.id}`}
                        className="community-link"
                      >
                        View Posts
                      </Link>
                      <div className="community-button">
                        <button className="followbutton" type="button">
                          Follow
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )
      } else {
        return (
          <div className="community-cards-item">
            <div className="community-card">
              <img
                src={community.profileImg}
                className="community-card-image"
              />
              <div className="card">
                <div className="community-card-title">{community.name}</div>
                <div className="community-card-text">
                  {community.description}
                </div>
                <Link
                  to={`/Community/${community.id}`}
                  className="community-link"
                >
                  Detail
                </Link>
                <div className="community-button">
                  <button className="followbutton" type="button">
                    Follow
                  </button>
                </div>
              </div>
              <br />
            </div>
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
            src="https://cdn.cnn.com/cnnnext/dam/assets/200512161230-tony-hawk-pro-skater-super-tease.jpg"
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

const mapState = state => ({community: state.community})

const mapDispatch = dispatch => ({
  fetchOneCommunity: name => dispatch(fetchOneCommunity(name))
})

const CommunityPage = connect(mapState, mapDispatch)(CommunitySearch)

export default CommunityPage
