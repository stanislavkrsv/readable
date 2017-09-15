import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { makeUpdateCommentRequest } from '../../../actions'

/**
 * Edit form fot comments
 */
class CommentEditForm extends Component {

  static propTypes = {
    comment: PropTypes.object.isRequired,
    showCommentEditForm: PropTypes.func.isRequired
  }

  state = {
    commentBody: ''
  }

  handleFormChange(event) {
    this.setState({ [event.target.name] : event.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { comment, makeUpdateCommentRequest, showCommentEditForm} = this.props
    const { commentBody } = this.state
    makeUpdateCommentRequest(comment.id, comment.parentId, commentBody)
    showCommentEditForm('')
  }

  render(){
    const { showCommentEditForm, comment } = this.props
    return(
      <form className="form comment-edit-form" onSubmit={this.handleSubmit}>
        <div className="form__block">
          <textarea
            name="commentBody"
            className="textarea"
            required
            autoFocus
            defaultValue={comment.body}
            onChange={event => this.handleFormChange(event)}
          />
        </div>
        <div className="form__block">
          <button className="btn btn--small btn--action" type="submit">Update</button>
          <button className="btn btn--small" onClick={()=>showCommentEditForm('')} type="button">Cancel</button>
        </div>
      </form>
    )
  }
}

export default connect(null, { makeUpdateCommentRequest })(CommentEditForm)