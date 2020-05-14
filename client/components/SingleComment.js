import React, {Component} from 'react'

//import thunk:
import {fetchSingleComment} from '../store/singleComment'
import {connect} from 'react-redux'

class SingleComment extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.fetchSingleComment()
  }

  render() {
    console.log('props???>>>>>', this.props)
    return (
      <div className="commentContainer">
        <br />
        <div>TESTING SINGLE COMMENT COMPONENT</div>
      </div>
    )
  }
}

const mapToState = state => {
  return {
    comment: state.comment
  }
}

const mapToDispatch = (dispatch, ownProps) => {
  const comment = ownProps.match.params.comment
  return {
    fetchSingleComment: () => dispatch(fetchSingleComment(comment))
  }
}

export default connect(mapToState, mapToDispatch)(SingleComment)
