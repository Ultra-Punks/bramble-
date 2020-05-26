import React from 'react'
import {Form, Modal} from 'react-bootstrap'
import {AwesomeButton} from 'react-awesome-button'

export default class AddCommentForm extends React.Component {
  constructor() {
    super()
    this.state = {
      comment: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    this.props.addComment(this.state.comment)
    this.setState({
      comment: ''
    })
    this.props.closeForm()
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
        <div className="submit-comment-container">
          <h1 className="reply-text">Reply</h1>
          <form className="width-100" onSubmit={this.handleSubmit}>
            <Form.Control
              className="description-input"
              name="comment"
              placeholder="Reply to comment..."
              as="textarea"
              rows="5"
              style={{color: 'black'}}
              onChange={this.handleChange}
            />
            <div className="comment-submit">
              {this.state.comment.length ? (
                <AwesomeButton>Reply</AwesomeButton>
              ) : (
                <AwesomeButton disabled>Reply</AwesomeButton>
              )}
            </div>
          </form>
        </div>
      </Modal>
    )
  }
}
