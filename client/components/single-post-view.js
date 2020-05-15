import React from 'react'
import {connect} from 'react-redux'
import {fetchSinglePost} from '../store/singlePost'
import {Image} from 'react-bootstrap'

function PostingPictures(props) {
  const {post} = props
  if (
    post !== undefined &&
    post.photos !== undefined &&
    post.photos.length > 0
  ) {
    return (
      <div className="image-single-post-container">
        <img src={post.photos[0].imgFile} className="single-post-img" />
        <div className="image-rec-container">
          <li className="test">test</li>
          <li className="test">test</li>
          <li className="test">test</li>
          <li className="test">test</li>
          <li className="test">test</li>
          <li className="test">test</li>
          <li className="test">test</li>
          <li className="test">test</li>
          <li className="test">test</li>
          <li className="test">test</li>
          <li className="test">test</li>
          <li className="test">test</li>
          <li className="test">test</li>
          <li className="test">test</li>
        </div>
      </div>
    )
  } else {
    return <div />
  }
}

function UserInformation(props) {
  const {post} = props
  if (post !== undefined && post.user !== undefined) {
    const user = post.user
    return (
      <div>
        <Image className="post-pfp" src={user.profileImg} roundedCircle />
        <p>{user.username}</p>
      </div>
    )
  } else {
    return <div />
  }
}

class SinglePostView extends React.Component {
  constructor() {
    super()
    this.state = {
      picture: '',
      scannedResults: []
    }
    this.onClick = this.onClick.bind(this)
  }
  componentDidMount() {
    this.props.fetchPost()
  }

  onClick() {
    console.log('TEST')
  }

  render() {
    const post = this.props.post

    return (
      <div className="single-post-container">
        <PostingPictures post={post} />
        <p>{post.description}</p>
        <UserInformation post={post} />
        {/* <button type="button" onClick={() => this.onClick()}>
          Scan Image
        </button> */}
      </div>
    )
  }
}

const mapState = state => {
  return {
    post: state.singlePost
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const postId = ownProps.match.params.postId
  return {
    fetchPost: () => dispatch(fetchSinglePost(postId))
  }
}

export default connect(mapState, mapDispatch)(SinglePostView)
