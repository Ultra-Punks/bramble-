import React from 'react'
import {connect} from 'react-redux'
import {addCommentThunk} from '../store/postComments'
import {fetchUserPosts} from '../store/userFeed'

export class AddCommentForm extends React.Component {
  constructor() {
    super()
    this.state = {
      comment: ''
      // likes : 0 ,
      // dislikes : 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    // this.props.fetchUserPosts()
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    this.props.add(41, this.state.comment)
    this.setState({
      comment: ''
      // likes: 0,
      // dislikes: 0,
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="comment">Comment:</label>
        <input
          name="comment"
          type="text"
          value={this.state.comment}
          onChange={this.handleChange}
        />
        <button type="submit" onClick={this.handleSubmit}>
          Submit
        </button>
      </form>
    )
  }
}

const mapState = state => {
  return {
    allCommemts: state.comment
  }
}

const mapDispatch = dispatch => ({
  add: (id, comment) => {
    dispatch(addCommentThunk(id, comment))
  },
  getPosts: () => {
    dispatch(fetchUserPosts())
  }
})
export default connect(mapState, mapDispatch)(AddCommentForm)
