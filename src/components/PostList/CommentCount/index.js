import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchCommentsIfNeeded } from '../../../actions'

/**
 * Post's comments count
 */
class CommentCount extends Component {

  static propTypes = {
    post: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { fetchCommentsIfNeeded, post } = this.props
    fetchCommentsIfNeeded(post.id)
  }

  render(){
    const { commentCount } = this.props
    return(
      <span className="post__comment-count">
        {commentCount} comments
      </span>
    )
  }
}

function mapStateToProps({comments}, ownProps) {
  const postId = ownProps.post.id
  const commentCount = (comments[postId]) ? comments[postId].items.length : 0
  return {
    commentCount: commentCount
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCommentsIfNeeded: (postId) => dispatch(fetchCommentsIfNeeded(postId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentCount)