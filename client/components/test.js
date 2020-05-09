/* eslint-disable react/jsx-key */
import React from 'react'
import {connect} from 'react-redux'
import {fetchRecipe} from '../store/food'

class Test extends React.Component {
  constructor() {
    super()
    this.state = {
      food: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit() {
    event.preventDefault()
    try {
      this.props.fetchRecipe(this.state.food)
      this.setState({
        food: ''
      })
    } catch (error) {
      console.log('error')
    }
  }

  searchResults = () => {
    const food = this.props.food
    if (food.length) {
      return (
        <div>
          {food.map(result => {
            return (
              <div>
                <h1>{result.restaurantChain}</h1>
                <img src={result.image} />
              </div>
            )
          })}
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            name="food"
            type="text"
            onChange={this.handleChange}
            value={this.state.card}
          />
          <button type="submit"> Submit </button>
        </form>

        {/* <button type="button" onClick={() => this.onClick()}>
          Scan Image
        </button> */}
        <br />
        <br />
        <div>{this.searchResults()}</div>
      </div>
    )
  }
}
const mapState = state => ({food: state.food})

const mapDispatch = dispatch => ({
  fetchRecipe: query => dispatch(fetchRecipe(query))
})

const Recipe = connect(mapState, mapDispatch)(Test)

export default Recipe
