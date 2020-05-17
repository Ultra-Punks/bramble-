import React from 'react'

// class SingleLocation extends React.Component {
const SingleLocation = props => {
  const {location} = props
  Object.keys(location).map(el => {
    return <p key={el.id}>{`${el} ${location[el]}`}</p>
  })
}

export default SingleLocation
