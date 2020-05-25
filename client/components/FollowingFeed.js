/* eslint-disable react/jsx-key */
import React from 'react'
import FeedPostPreview from './FeedPostPreview'
import {Link} from 'react-router-dom'
import TimeAgo from 'react-timeago'
import {Image} from 'react-bootstrap'
import history from '../history'

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
  // console.log('partial + rating', partial, rating)
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

export default function FollowingFeed(props) {
  if (props.posts) {
    const {posts} = props
    return (
      <div className="home-feed-view">
        {posts.map(post => {
          if (post.type !== 'Feature') {
            return (
              <FeedPostPreview
                key={post.id}
                post={post}
                loggedInUser={props.loggedInUser}
                isLoggedIn={props.isLoggedIn}
              />
            )
          } else {
            return (
              <div key={post.id} className="single-post-preview-container">
                {post.communityId &&
                post.community &&
                post.community.name !== undefined ? (
                  <Link
                    className="link-to-community"
                    to={`/community/list/${post.communityId}`}
                  >
                    <div className="community-post-label-feed">
                      <p>Location</p>
                      <p>{post.community.name}</p>
                    </div>
                  </Link>
                ) : (
                  ''
                )}
                <div className="single-post">
                  <div className="inner-single-post">
                    {post.user !== undefined ? (
                      <div className="pfp-col">
                        <Image
                          className="post-pfp"
                          src={post.user.profileImg}
                          roundedCircle
                          onClick={() =>
                            history.push(`/u/${post.user.username}`)
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
                            {post.user !== undefined ? (
                              <div className="post-info-inner">
                                <p
                                  className="handle-text"
                                  onClick={() =>
                                    history.push(`/u/${post.user.username}`)
                                  }
                                >
                                  {post.user.name}
                                </p>
                                <p
                                  className="handle-text"
                                  onClick={() =>
                                    history.push(`/u/${post.user.username}`)
                                  }
                                >
                                  @{post.user.username}
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
                            <Link className="link-to-post" to={`/l/${post.id}`}>
                              <TimeAgo
                                className="time-ago"
                                date={post.createdAt}
                                live={false}
                              />
                              <img
                                className="post-images"
                                src={post.coverImg}
                              />
                              <Ratings location={post} />
                              <p className="address-text">{post.address}</p>
                              <p className="post-text-location">
                                {post.description}
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
          }
        })}
      </div>
    )
  } else {
    return <div />
  }
}
