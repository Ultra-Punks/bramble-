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
          <div className="communityBlock">
            {community.map(result => {
              return (
                <div key={result.id} className="communityContainer">
                  <img src={result.profileImg} className="imageStyle" />
                  <div className="card">
                    <div>{result.name}</div>
                    <div>{result.description}</div>
                    {/* <button
                    // onClick ={ history.push
                    >

                    </button> */}
                    <Link to={`/Community/list/${result.id}`}>View Posts</Link>
                    <button className="followbutton" type="button">
                      Follow
                    </button>
                  </div>
                  <br />
                </div>
              )
            })}
          </div>
        )
      } else {
        return (
          <div className="communityBlock">
            <div className="communityContainer">
              <img src={community.profileImg} className="imageStyle" />
              <div className="card">
                <div>{community.name}</div>
                <div>{community.description}</div>
                <Link to={`/Community/${community.id}`}>Detail</Link>
                <div>
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
              className="magPic"
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
