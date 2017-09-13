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

  constructor(props, context) {
    super(props, context)
    this.state = {
      commentBody: this.props.comment.body,
    }
  }

  handleFormChange(event) {
    this.setState({ [event.target.name] : event.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { comment, updateComment, showCommentEditForm} = this.props
    const { commentBody} = this.state
    updateComment(comment.id, comment.parentId, commentBody)
    showCommentEditForm('')
  }

  render(){
    const { showCommentEditForm } = this.props
    const { commentBody } = this.state
    return(
      <form className="form comment-edit-form" onSubmit={this.handleSubmit}>
        <div className="form__block">
          <textarea
            name="commentBody"
            className="textarea"
            required
            autoFocus
            defaultValue={commentBody}
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

function mapStateToProps() {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateComment: (id, postId, body) => dispatch(makeUpdateCommentRequest(id, postId, body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentEditForm)