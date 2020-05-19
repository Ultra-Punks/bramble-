import React from 'react'
import {Button} from 'react-bootstrap'

function DisplaySubUnsub(props) {
  const {isSubscribed, subscribe, unsubscribe} = props
  if (isSubscribed) {
    return (
      <Button
        className="follow-button"
        variant="outline-light"
        onClick={() => unsubscribe()}
      >
        Unsubscribe
      </Button>
    )
  } else {
    return (
      <Button
        className="follow-button"
        variant="outline-light"
        onClick={() => {
          subscribe()
        }}
      >
        Subscribe
      </Button>
    )
  }
}

export default DisplaySubUnsub
