import React from 'react'

class SinglePostView extends React.Component {
  constructor() {
    super()
    this.state = {
      picture: '',
      scannedResults: []
    }
    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    console.log('TEST')
  }

  render() {
    return (
      <div>
        <h2>Title</h2>
        <img src="https://d.facdn.net/art/dphc4l/1528557648/1528557648.dphc4l_photo_2018-06-06_04-49-43.jpg" />
        <h3> </h3>
        <button type="button" onClick={() => this.onClick()}>
          Scan Image
        </button>
      </div>
    )
  }
}

export default SinglePostView
