import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'

//import thunk:
// import {fetchComments} from '../store/postComments'
// import {fetchProfile} from '../store/singleProfile'

// import {fetchUser} from '../store/user'

// NOTE: Icons only placeholders. Found them on this site: https://icons8.com/icons/set/like-heart

export default function PostComments(props) {
  return (
    Array.isArray(props.commentsOnPosts) &&
    props.commentsOnPosts.map(comment => {
      if (comment.userPostId === props.postId) {
        return (
          <div key={comment.id}>
            {/* need to map through comment per userPostId */}
            CAN YOU SEE THIS???{comment.comment}
          </div>
        )
      }
    })
  )
}

// return (
//   <div className="feedView">
//     {Array.isArray(props.posts) &&
//       props.posts.map((post) => {
//         return (
//           <div key={post.id} className="single-post">
//             <div className="post-header">
//               {/* <Image
//                 className="post-pfp"
//                 src={props.profile.profileImg}
//                 roundedCircle
//               /> */}
//               <div className="post-info">
//                 <div className="post-handle">
//                   <p className="handle-text">{props.profile.name}</p>
//                   <p className="handle-text">@{props.profile.username}</p>
//                 </div>
//                 <p className="post-text">{post.description}</p>
//               </div>
//             </div>
//             <br />
//           </div>
//         )
//       })}
//   </div>
// )
//   }
// }

// export default PostComments

// /* eslint-disable react/jsx-key */
// import React from 'react'

// class PostComments extends React.Component {
//   constructor() {
//     super()
//     // constructor for time being.
//   }

//   render() {
//     return (
//       <div className="feedView">
//         {Array.isArray(props.posts) &&
//           props.posts.map((post) => {
//             return (
//               <div key={post.id} className="single-post">
//                 <div className="post-header">
//                   {/* <Image
//                     className="post-pfp"
//                     src={props.profile.profileImg}
//                     roundedCircle
//                   /> */}
//                   <div className="post-info">
//                     <div className="post-handle">
//                       <p className="handle-text">{props.profile.name}</p>
//                       <p className="handle-text">@{props.profile.username}</p>
//                     </div>
//                     <p className="post-text">{post.description}</p>
//                   </div>
//                 </div>

//                 <br />
//               </div>
//             )
//           })}
//       </div>
//     )
//   }
// }
