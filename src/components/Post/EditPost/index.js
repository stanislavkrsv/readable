import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import history from '../../../utils/history'
import { makeUpdatePostRequest } from '../../../actions'

/**
 * Edit Post
 */
class EditPost extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { post, makeUpdatePostRequest } = this.props
    makeUpdatePostRequest(post.id, this.refs.title.value, this.refs.body.value).then(()=> history.goBack())
  }

  render(){
    const { post } = this.props
    return(
      <div className="content">
        {post && (
        <div className="post-form">
          <h1 className="post-form__title">Edit Post</h1>
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form__block">
              <label className="label">Title</label>
              <input
                name="title"
                ref="title"
                defaultValue={post.title}
                required
                autoFocus
                type="text"
                className="input input--xl"
                placeholder="Title"/>
            </div>
            <div className="form__block">
              <label required className="label">Body</label>
              <textarea
                name="body"
                ref="body"
                defaultValue={post.body}
                required
                className="textarea"
                placeholder="Body"
              />
            </div>
            <div className="form__block">
              <label className="label">Category <strong>{post.category}</strong></label>
            </div>
            <div className="form__block">
              <label className="label">Author <strong>{post.author}</strong></label>
            </div>
            <div className="form__block form__block--buttons">
              <button className="btn btn--action" type="submit">Save</button>
              <button className="btn" onClick={() => history.goBack()} type="button">Cancel</button>
            </div>
          </form>
        </div>
        )}
      </div>
    )
  }
}

function mapStateToProps({posts}, ownProps) {
  return {
    post : posts.items.find(post => post.id === ownProps.id),
  }
}

export default connect(mapStateToProps, { makeUpdatePostRequest })(EditPost)