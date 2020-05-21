import React from 'react'
import {connect} from 'react-redux'
import {addCommentThunk} from '../store/postComments'
import {fetchUserPosts} from '../store/userFeed'
import {InputGroup, Form, Button, Modal} from 'react-bootstrap'

export default class AddLocationReview extends React.Component {
  constructor() {
    super()
    this.state = {
      comments: '',
      rating: 0,
      show: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    // this.props.fetchUserPosts()
  }

  handleShowForm() {
    this.setState({show: true})
  }

  handleHideForm() {
    this.setState({show: false})
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    this.props.addReview(this.props.locationId, this.state)
    this.setState({
      comments: '',
      rating: 0
    })
  }

  render() {
    return (
      <div>
        <Button
          type="submit"
          variant="danger"
          onClick={() => this.handleShowForm()}
        >
          Rate this place
        </Button>
        <Modal
          onHide={() => this.handleHideForm()}
          show={this.state.show}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="comments">Comment:</label>
            <input
              name="comments"
              type="text"
              value={this.state.comment}
              onChange={this.handleChange}
            />
            <button type="submit" onClick={this.handleSubmit}>
              Submit
            </button>
          </form>
        </Modal>
      </div>
    )
  }
}

const mapState = state => {
  return {
    allCommemts: state.comment,
    username: state.singleProfile.profile.username
  }
}

const mapDispatch = dispatch => ({
  add: (id, comment, username) => {
    dispatch(addCommentThunk(id, comment))
    dispatch(fetchUserPosts(username))
  }
})
// export default connect(mapState, mapDispatch)(AddCommentForm)
