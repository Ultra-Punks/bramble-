import React from 'react'
import {connect} from 'react-redux'
import {fetchUserPosts} from '../store/userFeed'
import {InputGroup, Form, Button, Modal} from 'react-bootstrap'
import {AwesomeButton} from 'react-awesome-button'

export default class AddLocationReview extends React.Component {
  constructor() {
    super()
    this.state = {
      comments: '',
      ratings: 1,
      show: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
    // event.preventDefault()
    this.props.addReview(this.props.locationId, this.state)
    // this.props.fetch(this.props.locationId)
    this.setState({
      comments: '',
      ratings: 1
    })
    this.handleHideForm()
  }

  render() {
    return (
      <div>
        <AwesomeButton
          className="add-review-button"
          type="secondary"
          variant="secondary"
          onPress={() => this.handleShowForm()}
          style={{
            fontSize: '1.3em',
            marginLeft: '10px',
            marginBottom: '10px'
          }}
        >
          Rate this place
        </AwesomeButton>
        <Modal
          onHide={() => this.handleHideForm()}
          show={this.state.show}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Form className="add-review-form" onSubmit={this.handleSubmit}>
            <Form.Group controlId="ratings">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                name="ratings"
                as="select"
                custom
                value={this.state.ratings}
                onChange={this.handleChange}
              >
                <option value={1}>One Star</option>
                <option value={2}>Two Stars</option>
                <option value={3}>Three Stars</option>
                <option value={4}>Four Stars</option>
                <option value={5}>Five Stars</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="comments">
              <Form.Label>Comment:</Form.Label>
              <Form.Control
                name="comments"
                // type="text"
                placeholder="What did you think of this place?"
                as="textarea"
                rows="5"
                value={this.state.comment}
                onChange={this.handleChange}
              />
              <AwesomeButton type="submit">Submit</AwesomeButton>
            </Form.Group>
          </Form>
        </Modal>
      </div>
    )
  }
}

// const mapState = state => {
//   return {
//     allCommemts: state.comment,
//     username: state.singleProfile.profile.username
//   }
// }

// const mapDispatch = dispatch => ({
//   add: (id, comment, username) => {
//     dispatch(addCommentThunk(id, comment))
//     dispatch(fetchUserPosts(username))
//   }
// })
// export default connect(mapState, mapDispatch)(AddCommentForm)
