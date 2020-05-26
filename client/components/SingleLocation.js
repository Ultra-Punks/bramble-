import React from 'react'
import {connect} from 'react-redux'
import {fetchOneLocation, addLocationReviewThunk} from '../store/singleLocation'
import {Link} from 'react-router-dom'
import {Image, Modal} from 'react-bootstrap'
import {
  Map,
  MapForSingleLocation,
  LocationReviews,
  AddLocationReview
} from './index'

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

  if (
    post !== undefined &&
    post.user !== undefined &&
    post.user.profileImg !== undefined
  ) {
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
  if (
    !location ||
    !location.locationReviews ||
    !location.locationReviews[0] ||
    !location.locationReviews[0].ratings
  )
    return <div />

  const halfStar = (
    <img src="https://img.icons8.com/material-sharp/452/star-half.png" />
  )
  const averageRating =
    location.locationReviews
      .map(r => r.ratings)
      .reduce((acc, cur) => acc + cur) / location.locationReviews.length
  const partial = averageRating % Math.floor(averageRating)
  const rounded = averageRating - partial
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
    const location = this.props.location
    if (!location || !location.id)
      return <div>Couldn't find this location, please try back later</div>

    return (
      <div className="page-container">
        <div className="single-location-view-container">
          <div key={location.id} className="single-post">
            <div className="photo-and-map">
              {location.coverImg && (
                <div className="location-photos">
                  <p className="location-name">{location.name}</p>
                  <img
                    src={location.coverImg}
                    className="single-location-view-img"
                  />
                </div>
              )}
            </div>
            <div className="rating-and-address">
              <Ratings location={location} />
              <p className="single-location-address">{location.address}</p>
            </div>

            <div className="description-container">
              <p className="location-description">{location.description}</p>
            </div>
            <div className="single-location-feedback">
              {this.props.isLoggedIn && (
                <AddLocationReview
                  addReview={this.props.addReview}
                  locationId={location.id}
                />
              )}
            </div>

            <LocationReviews location={location} />
          </div>
          <div className="profileMapContainer sticky">
            <MapForSingleLocation location={this.props.location} />
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  location: state.singleLocation,
  isLoggedIn: !!state.user.id
})

const mapDispatch = (dispatch, ownProps) => {
  const id = ownProps.match.params.id
  return {
    fetchLocation: () => dispatch(fetchOneLocation(id)),
    addReview: (locationId, review) =>
      dispatch(addLocationReviewThunk(locationId, review))
  }
}

export default connect(mapState, mapDispatch)(SingleLocationView)
