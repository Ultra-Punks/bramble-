/* eslint-disable react/jsx-key */
import React from 'react'
import {connect} from 'react-redux'
import {fetchCommunity} from '../store/community'

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
    this.props.fetchCommunity()
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit() {
    event.preventDefault()
    try {
      this.props.fetchOneCommunity(1)
      this.setState({
        community: ''
      })
    } catch (error) {
      console.log('error')
    }
  }

  // searchResults = () => {
  //   const community = this.props.community
  //   if (community.length) {
  //     return (
  //       <div>
  //         {community.map((result) => {
  //           return (
  //             <div>
  //               <h1>{result.restaurantChain}</h1>
  //               <img src={result.image} />
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
        {/* <form onSubmit={this.handleSubmit}>
          <input
            name="community"
            type="text"
            onChange={this.handleChange}
            value={this.state.community}
          />
          <button type="submit"> Submit </button>
        </form> */}

        <div>
          {community.map(communities => (
            <div key={communities.id}>
              <div>
                <div>
                  <p>{communities.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <br />
        <br />
        <div>{}</div>
      </div>
    )
  }
}

const mapState = state => ({community: state.community})

const mapDispatch = dispatch => ({
  fetchCommunity: id => dispatch(fetchCommunity(id))
})

const CommunityPage = connect(mapState, mapDispatch)(CommunitySearch)

export default CommunityPage
