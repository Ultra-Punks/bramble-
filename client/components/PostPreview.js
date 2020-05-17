import React from 'react'

export default function CommentPreview(props) {
  const {comment} = props
  console.log('COMMENT IN PREVIEW>>>>', comment)
  return (
    <div>
      <div className="commentWriting">{comment}</div>
      <div className="commentShareBar">
        <div className="likes">
          {likes >= 1 && (
            <div style={{paddingLeft: '13px', marginBottom: '-25px'}}>
              {likes}
            </div>
          )}
          <img
            src="https://img.icons8.com/ios/64/000000/like.png"
            className="likeIcon"
            type="button"
            onClick={() => this.likeComment()}
          />
        </div>
        <div className="dislikes">
          {dislikes >= 1 && (
            <div style={{paddingLeft: '13px', marginBottom: '-25px'}}>
              {dislikes}
            </div>
          )}
          <img
            src="https://img.icons8.com/windows/80/000000/dislike.png"
            className="dislikeIcon"
            type="button"
            onClick={() => this.dislikeComment()}
          />
        </div>
      </div>
    </div>
  )
}
