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
                    <Link to={`/Community/list/${result.id}`}>Detail</Link>
                    <button type="button">Follow</button>
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
                <button type="button">Follow</button>
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
        <br />
        <br />

        <form onSubmit={this.handleSubmit}>
          <input
            name="community"
            type="text"
            onChange={this.handleChange}
            value={this.state.community}
          />
          <button type="submit"> Search </button>
        </form>
        <br />
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
