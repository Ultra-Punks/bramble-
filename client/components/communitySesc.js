/* eslint-disable react/jsx-key */
import React from 'react'
import {connect} from 'react-redux'
import {fetchOneCommunity} from '../store/community'

class CommunitySearch extends React.Component {
  constructor() {
    super()
    this.state = {
      community: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  // componentDidMount() {
  //   this.props.fetchCommunity()
  // }

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

  searchResults = () => {
    const community = this.props.community
    if (community.name) {
      return (
        <div>
          <h1>{community.name}</h1>
        </div>
      )
    }
  }

  // searchResults = () => {
  //   const community = this.props.community
  //   if (community.name) {
  //     return (
  //       <div>
  //         {community.map((result) => {
  //           return (
  //             <div>
  //               <h1>{result.name}</h1>
  //             </div>
  //           )
  //         })}
  //       </div>
  //     )
  //   }
  // }

  render() {
    const community = this.props.community
    console.log('thisssss', this.props)
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            name="community"
            type="text"
            onChange={this.handleChange}
            value={this.state.community}
          />
          <button type="submit"> Submit </button>
        </form>
        <div>{this.searchResults}</div>
        {/* <div>
          {this.state.community === ''
            ? community.map((item) => (
                <div key={item.id}>
                  <div>
                    <div>
                      <p>{item.name}</p>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div> */}
      </div>
    )
  }
}

const mapState = state => ({community: state.community})

const mapDispatch = dispatch => ({
  // fetchCommunity: () => dispatch(fetchCommunity()),
  fetchOneCommunity: name => dispatch(fetchOneCommunity(name))
})

const CommunityPage = connect(mapState, mapDispatch)(CommunitySearch)

export default CommunityPage
