import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { confirmAlert } from 'react-confirm-alert'
import history from '../../../utils/history'
import { makeDeletePostRequest } from '../../../actions'

/**
 * Post's buttons (Delete, Edit)
 */
class PostActionButtons extends Component {

  static propTypes = {
    post: PropTypes.object.isRequired,
    redirect: PropTypes.bool
  }

  deleteDialog = () => {
    const { makeDeletePostRequest, post, redirect } = this.props
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this post?',
      confirmLabel: 'Delete',
      cancelLabel: 'Cancel',
      onConfirm: () => makeDeletePostRequest(post.id).then(()=> {
        redirect === true && history.goBack()
      })
    })
  }

  render(){
    const { post } = this.props
    return(
      <span className="post__action-button">
        <button className="btn btn--mini" onClick={this.deleteDialog}>delete</button>
        <Link to={`/${post.category}/${post.id}/edit`} className="btn btn--mini">edit</Link>
      </span>
    )
  }
}


export default connect(null, { makeDeletePostRequest })(PostActionButtons)