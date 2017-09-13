import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { confirmAlert } from 'react-confirm-alert'
import { makeDeleteCommentRequest } from '../../../actions'


/**
 * Comment's buttons (Delete, Edit)
 */
class CommentActionButtons extends Component {

  static propTypes = {
    comment: PropTypes.object.isRequired
  }

  deleteDialog = () => {
    const { makeDeleteCommentRequest, comment } = this.props
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this comment?',
      confirmLabel: 'Delete',
      cancelLabel: 'Cancel',
      onConfirm: () => makeDeleteCommentRequest(comment.id, comment.parentId)
    })
  }

  render(){
    const { comment , showCommentEditForm} = this.props
    return(
      <span className="comment__action-button">
        <button className="btn btn--mini" onClick={this.deleteDialog}>delete</button>
        <button className="btn btn--mini" onClick={()=>{showCommentEditForm(comment.id)}}>edit</button>
      </span>
    )
  }
}

function mapStateToProps() {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    makeDeleteCommentRequest: (id, postId) => dispatch(makeDeleteCommentRequest(id, postId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentActionButtons)