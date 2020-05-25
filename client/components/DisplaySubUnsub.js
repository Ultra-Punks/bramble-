import React from 'react'
import {Button} from 'react-bootstrap'
import {AwesomeButton} from 'react-awesome-button'

function DisplaySubUnsub(props) {
  const {isSubscribed, subscribe, unsubscribe} = props
  if (isSubscribed) {
    return (
      <AwesomeButton
        className="follow-button"
        variant="outline-light"
        onPress={() => unsubscribe()}
      >
        Unsubscribe
      </AwesomeButton>
    )
  } else {
    return (
      <AwesomeButton
        className="follow-button"
        variant="outline-light"
        onPress={() => {
          subscribe()
        }}
      >
        Subscribe
      </AwesomeButton>
    )
  }
}

export default DisplaySubUnsub
