import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { makeCreateCommentRequest } from '../../../actions'

/**
 * Create comment form
 */
class CommentCreateForm extends Component {

  static propTypes = {
    postId: PropTypes.string.isRequired,
  }

  state = {
    author: '',
    body: ''
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      author: this.props.username,
    }
  }

  handleFormChange(event) {
    this.setState({ [event.target.name] : event.target.value})
  }

  handleSubmit = (e) => {
    const { postId, createComment } = this.props
    const { author, body } = this.state
    e.preventDefault()
    createComment(postId, author, body).then(() => {
      this.refs.body.value = ''
      this.setState({body: ''})
    })
  }

  render(){
    const { showNewCommentOverlayBlock , username } = this.props;
    return(
      <div className="new-comment-form">
        {showNewCommentOverlayBlock === true && <div className="comment__overlay"></div>}
        <h3 className="new-comment-form__title">New comment</h3>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form__block">
            <input
              name="author"
              type="text"
              required
              className="input"
              defaultValue={username}
              placeholder="Your username"
              onChange={event => this.handleFormChange(event)}
            />
          </div>
          <div className="form__block">
            <textarea
              name="body"
              ref="body"
              required
              className="textarea"
              defaultValue=''
              placeholder="Comment"
              onChange={event => this.handleFormChange(event)}
            />
          </div>
          <div className="form__block">
            <button className="btn btn--action" type="submit">Add comment</button>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ comments, user}) {
  return {
    showNewCommentOverlayBlock: comments.showNewCommentOverlayBlock,
    username : user.username
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createComment: (postId, author, body) => dispatch(makeCreateCommentRequest(postId, author, body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentCreateForm)