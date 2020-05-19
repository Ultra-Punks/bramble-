// * eslint - disable react / jsx - key * /
import React from 'react'
import CommunityPostPreview from './CommunityPostPreview'

export default function PostFeed(props) {
  console.log('testttttt', props.posts)
  if (props.postFeed) {
    return (
      <div className="feedView">
        {Array.isArray(props.posts) &&
          props.posts.map(post => {
            return (
              <CommunityPostPreview
                key={post.id}
                post={post}
                // profile={props.profile}
                className="all-comment-preview-container"
              />
              // <div key={post.id} className="single-post">
              //   <div className="post-header">
              //     <Image className="post-pfp" src={post.user.profileImg} />
              //     <div className="post-info">
              //       <div className="post-handle">
              //         <p className="handle-text">{post.user.name}</p>
              //         <p className="handle-text">@{post.user.username}</p>
              //       </div>
              //       <p className="post-text">{post.description}</p>
              //     </div>
              //   </div>
              //   <div className="post-photos">
              //     <img
              //       src="https://img.freepik.com/free-photo/blue-mountains-famous-tourism-scenery-lijiang_1417-1143.jpg?size=626&ext=jpg"
              //       className="post-images"
              //     />
              //   </div>
              //   <br />
              // </div>
            )
          })}
      </div>
    )
  } else {
    return (
      <div className="gallery-container">
        {props.images.map(image => {
          return (
            <img
              key={image.filename}
              className="gallery-photo"
              src={image.url}
            />
          )
        })}
      </div>
    )
  }
}
