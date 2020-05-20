import React from 'react'
import {connect} from 'react-redux'
import {fetchOneLocation} from '../store/singleLocation'
import {Link} from 'react-router-dom'
import {Image} from 'react-bootstrap'
import {Map, LocationReviews} from './index'
import MapGL from 'react-map-gl'

function PostingPictures(props) {
  const {post} = props
  if (post !== undefined && post.photos !== undefined && post.photos.length) {
    return (
      <div className="img-container">
        <img src={post.photos[0].imgFile} className="single-post-view-img" />
      </div>
    )
  } else {
    return <div />
  }
}

function UserPFP(props) {
  const {post} = props

  if (post !== undefined && post.user !== undefined && post.user.profileImg) {
    return (
      <Image className="post-pfp" src={post.user.profileImg} roundedCircle />
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
      <div className="post-handle">
        <Link to={`/u/${user.username}`}>
          <p className="handle-text">{user.name}</p>
          <p className="handle-text">@{user.username}</p>
        </Link>
      </div>
    )
  } else {
    return <div />
  }
}

function Ratings(props) {
  const {location} = props
  if (!location || !location.locationReviews) return <div />

  const halfStar = (
    <img src="https://img.icons8.com/material-sharp/452/star-half.png" />
  )
  const averageRating =
    location.locationReviews
      .map(r => r.ratings)
      .reduce((acc, cur) => acc + cur) / location.locationReviews.length
  const partial = averageRating % Math.floor(averageRating)
  const rounded = averageRating - partial
  // console.log('partial + rating', partial, rating)
  const numOfStars = Array(rounded).fill('')
  return (
    <div className="stars">
      {/* <p>this is the rating average: <strong>{rounded}</strong></p> */}
      <p>Rating:</p>
      {numOfStars.map((e, i) => (
        <img
          key={i}
          src="https://png.pngtree.com/png-clipart/20190619/original/pngtree-vector-star-icon-png-image_4013709.jpg"
        />
      ))}
      {partial > 0.25 && partial < 0.75 && halfStar}
    </div>
  )
}

class SingleLocationView extends React.Component {
  componentDidMount() {
    this.props.fetchLocation()
  }

  render() {
    console.log('THIS IS PROPS', this.props)
    const location = this.props.singleLocation
    if (!location)
      return (
        <div>
          Not enough info about this location yet
          {Object.keys(location).map((k, i) => {
            return <p key={i}>{`${k} ${location[k]}`}</p>
          })}
        </div>
      )
    return (
      <div className="page-container">
        <div className="single-location-view-container">
          <div key={location.id} className="single-post">
            {/* <PostingPictures className="post-photos" post={post} /> */}
            <div className="photo-and-map">
              {location.coverImg ? (
                <div className="location-photos">
                  <img
                    src={location.coverImg}
                    className="single-location-view-img"
                  />
                </div>
              ) : (
                ''
              )}
            </div>
            <div className="rating-and-address">
              <Ratings location={location} />
              <p>{location.address}</p>
            </div>

            <div className="description-container">
              <p className="post-text">
                <strong>{location.name}</strong>
              </p>
              <p>{location.description}</p>
            </div>
            {/* <div className="description-and-reviews"></div> */}
            <div className="single-location-feedback">
              <img
                className="reply-comment-button"
                src="https://cdn4.iconfinder.com/data/icons/pictype-free-vector-icons/16/reply-512.png"
              />
              <p>Rate</p>
            </div>
            <LocationReviews post={location} />
          </div>
          <div className="profileMapContainer sticky">
            <Map singleLocation={location} />
          </div>
          <div className="post-header">
            <UserPFP post={location} />
            <div className="post-info">
              <UserInformation post={location} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    singleLocation: state.singleLocation
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const id = ownProps.match.params.id
  return {
    fetchLocation: () => dispatch(fetchOneLocation(id))
  }
}

export default connect(mapState, mapDispatch)(SingleLocationView)
