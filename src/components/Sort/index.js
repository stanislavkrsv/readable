import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Sort posts and comments
 */
class Sort extends Component {

  static propTypes = {
    defaultValue: PropTypes.string.isRequired,
    onChangeFn : PropTypes.func.isRequired,
  }

  render(){

    const { defaultValue , onChangeFn } = this.props

    return(
      <div className="sort">
        <div className="btn select">
          <select defaultValue={defaultValue} onChange={(event)=> { onChangeFn(event.target.value) }}>
            <option value="-voteScore">Top rated</option>
            <option value="-timestamp">Most recent</option>
          </select>
        </div>
      </div>
    )
  }
}

export default Sort