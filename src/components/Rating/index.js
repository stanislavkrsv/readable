import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Rating
 */
class Rating extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    voteFn : PropTypes.func.isRequired,
    voteScore : PropTypes.number.isRequired,
  }

  getClass = (score) => {
    if (score > 0) {
      return ' rating--green'
    } else if (score < 0) {
      return ' rating--red'
    }
    return ''
  }

  render(){

    const { voteScore, voteFn, id } = this.props

    return(
      <div className="rating">
        <span className={`rating__value ${this.getClass(voteScore)}`}>{voteScore}</span>
        <button className="btn btn--img rating__incr" onClick={e => voteFn(id, 'upVote')}></button>
        <button className="btn btn--img rating__decr" onClick={e => voteFn(id, 'downVote')}></button>
      </div>
    )
  }
}

export default Rating