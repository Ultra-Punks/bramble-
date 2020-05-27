// * eslint - disable react / jsx - key * /
import React from 'react'
import CommunityPostPreview from './CommunityPostPreview'
import history from '../history'
import {Link} from 'react-router-dom'
import {Image} from 'react-bootstrap'
import TimeAgo from 'react-timeago'

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
      <p className="rating-text">Rating:</p>
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

export default function PostFeed(props) {
  if (props.postFeed === 'posts') {
    return (
      <div className="feedView">
        {Array.isArray(props.posts) &&
          props.posts.map(post => {
            return (
              <CommunityPostPreview
                key={post.id}
                post={post}
                className="all-comment-preview-container"
                loggedInUser={props.loggedInUser}
                isLoggedIn={props.isLoggedIn}
              />
            )
          })}
      </div>
    )
  } else if (props.postFeed === 'gallery') {
    return (
      <div className="gallery-container">
        {props.images.map(image => {
          return (
            <img
              key={image.id}
              className="gallery-photo"
              src={image.imgFile}
              onClick={() => history.push(`/p/${image.userPostId}`)}
            />
          )
        })}
      </div>
    )
  } else if (props.postFeed === 'locations') {
    return (
      <div>
        {props.locations.map(location => {
          return (
            <div key={location.id} className="single-post-preview-container">
              {location.communityId &&
              location.community &&
              location.community.name !== undefined ? (
                <Link
                  className="link-to-community"
                  to={`/community/list/${location.communityId}`}
                >
                  <div className="community-post-label">
                    {location.community.name}
                  </div>
                </Link>
              ) : (
                ''
              )}
              <div className="single-post">
                <div className="inner-single-post">
                  {location.user !== undefined ? (
                    <div className="pfp-col">
                      <Image
                        className="post-pfp"
                        src={location.user.profileImg}
                        roundedCircle
                        onClick={() =>
                          history.push(`/u/${location.user.username}`)
                        }
                      />
                    </div>
                  ) : (
                    ''
                  )}
                  <div className="post-header">
                    <div>
                      <div className="post-info">
                        <div className="post-handle">
                          {location.user !== undefined ? (
                            <div className="post-info-inner">
                              <p
                                className="handle-text"
                                onClick={() =>
                                  history.push(`/u/${location.user.username}`)
                                }
                              >
                                {location.user.name}
                              </p>
                              <p
                                className="handle-text"
                                onClick={() =>
                                  history.push(`/u/${location.user.username}`)
                                }
                              >
                                @{location.user.username}
                              </p>
                            </div>
                          ) : (
                            ''
                          )}
                          {/* {location.user.username === props.loggedInUser ? (
                            <Button
                              className="delete-button"
                              variant="secondary"
                              onClick={() => props.deletePost(location.id)}
                            >
                              X
                            </Button>
                          ) : (
                            ''
                          )} */}
                        </div>
                        <div className="post-feed-preview-info">
                          <Link
                            className="link-to-post"
                            style={{
                              display: 'flex',
                              'flex-direction': 'column'
                            }}
                            to={`/l/${location.id}`}
                          >
                            <TimeAgo
                              className="time-ago"
                              date={location.createdAt}
                              live={false}
                            />
                            <img
                              className="post-images"
                              src={location.coverImg}
                            />
                            <Ratings location={location} />
                            <p className="address-text">{location.address}</p>
                            <p className="post-text-location">
                              {location.description}
                            </p>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="post-photos" />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  } else {
    return <div />
  }
}
