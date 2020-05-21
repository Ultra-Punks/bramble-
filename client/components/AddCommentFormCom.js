import React from 'react'
import {connect} from 'react-redux'
import {addCommentThunk} from '../store/postComments'
import {fetchCommunityPosts} from '../store/userFeed'
import {InputGroup, Form, Button, Modal} from 'react-bootstrap'

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

  //  add the props.id for activeuser

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    this.props.add(
      this.props.postId,
      this.state.comment,
      this.props.communityId
    )
    this.setState({
      comment: ''
    })
  }

  render() {
    return (
      <Modal
        onHide={this.props.onHide}
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
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
      </Modal>
    )
  }
}

const mapState = state => {
  console.log('STATE', state)
  return {
    allCommemts: state.comment,
    communityId: state.community.communityProfile.id
  }
}

const mapDispatch = dispatch => ({
  add: (id, comment, communityId) => {
    dispatch(addCommentThunk(id, comment))
    dispatch(fetchCommunityPosts(communityId))
  }
})
export default connect(mapState, mapDispatch)(AddCommentForm)
