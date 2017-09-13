import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from '../../../utils/history'
import { fetchCategoriesIfNeeded, makeCreatePostRequest } from '../../../actions'

/**
 * Create post page
 */
class NewPost extends Component {

  state = {
    title : '',
    body : '',
    author : '',
    category : '',
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      ...this.state,
      author: this.props.username,
    }
  }

  componentDidMount() {
    const { fetchCategoriesIfNeeded } = this.props
    fetchCategoriesIfNeeded()
  }

  handleFormChange(event) {
    this.setState({ [event.target.name] : event.target.value})
  }

  handleSubmit = (e) => {
    const { title, body, author, category} = this.state
    const { makeCreatePostRequest } = this.props
    e.preventDefault();
    makeCreatePostRequest(title, body, author, category).then(()=> history.push('/'))
  }

  render(){
    const { categories} = this.props
    return(
      <div className="content">
        <div className="post-form">
          <h1 className="post-form__title">Create Post</h1>
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form__block">
              <label className="label">Title</label>
              <input
                name="title"
                defaultValue=""
                onChange={event => this.handleFormChange(event)}
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
                defaultValue=""
                onChange={event => this.handleFormChange(event)}
                required
                className="textarea"
                placeholder="Body"
              />
            </div>
            <div className="form__block">
              <label className="label">Category</label>
              <div className="btn select">
                <select
                  name="category"
                  defaultValue=""
                  onChange={event => this.handleFormChange(event)}
                  required
                >
                  {categories.map((item) => <option  key={item.path} value={item.path}>{item.name}</option>)}
                </select>
              </div>
            </div>
            <div className="form__block">
              <label className="label">Author</label>
              <input
                name="author"
                defaultValue={this.state.author}
                onChange={event => this.handleFormChange(event)}
                required
                type="text"
                className="input"
                placeholder="Author"/>
            </div>
            <div className="form__block form__block--buttons">
              <button className="btn btn--action" type="submit">Save</button>
              <button className="btn" onClick={() => history.goBack()} type="button">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps({categories, user}, ownProps) {
  let defaultCategory = [{ name : 'Select category', path : '' }]
  return {
    categories: defaultCategory.concat(categories.items),
    username: user.username,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategoriesIfNeeded: () => dispatch(fetchCategoriesIfNeeded()),
    makeCreatePostRequest : (title, body, author, category) => dispatch(makeCreatePostRequest(title, body, author, category)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)