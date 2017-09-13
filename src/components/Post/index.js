import React, { Component } from 'react'
import { Link} from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import nl2br  from 'react-nl2br'
import sortBy from 'sort-by'
import FlipMove from 'react-flip-move'
import {
  votePost,
  voteComment,
  fetchCommentsIfNeeded,
  setCommentSortColumn
} from '../../actions'
import Sort from '../Sort'
import Rating from '../Rating'
import PostActionButtons from './PostActionButtons'
import CommentActionButtons from './CommentActionButtons'
import CommentEditForm from './CommentEditForm'
import CommentCreateForm from './CommentCreateForm'

/**
 * Post
 */
class Post extends Component {

  state = {
    animation: 'fade',
    animationStaggerDelayBy: 60,
    editCommentFormId: ''
  }

  componentDidMount() {
    const { fetchCommentsIfNeeded, id } = this.props
    fetchCommentsIfNeeded(id)
    this.setState({editCommentFormId : ''})
  }

  showCommentEditForm = (id) => {
    this.setState({editCommentFormId : id})
  }

  render(){

    const { post, comments, votePost, setCommentSortColumn, commentsSortBy, voteComment } = this.props
    const { animation,  animationStaggerDelayBy, editCommentFormId } = this.state

    return(

      <section className="content">
        {post && (
          <div className="show-post">
            <div className="show-post__post">
              <Rating voteScore={post.voteScore} voteFn={votePost} id={post.id}/>
              <div className="show-post__text">
                <h1 className="show-post__title">
                  {post.title}
                </h1>
                <p>
                  {nl2br(post.body)}
                </p>
                <div className="post__data-block">
                  <span className="post__user">{post.author}</span>
                  <span>{moment(post.timestamp).fromNow()}</span>
                  <Link to={`/${post.category}`}>{post.category}</Link>
                  <PostActionButtons post={post} redirect={true} />
                </div>
              </div>
            </div>
            <div className="comments">
              {comments.length > 0 && (
                <div className="comments__count">
                  <div className="comments__count-title">
                    {comments.length} comments
                  </div>
                  <Sort defaultValue={commentsSortBy} onChangeFn={setCommentSortColumn} />
                </div>
              )}
              <div className="comments__list">
                <FlipMove appearAnimation={animation}
                           enterAnimation={animation}
                           leaveAnimation={animation}
                           staggerDelayBy={animationStaggerDelayBy}
                >
                {comments.map(comment =>
                  <div key={comment.id} className="comment">
                    {comment.commentBlocked === true && (<div className="comment__overlay"></div>)}
                    <Rating
                      voteScore={comment.voteScore}
                      id={comment.id}
                      voteFn={(id, option)=>{ voteComment(id, comment.parentId, option)}}
                    />
                    <div className="comment__content">
                      {editCommentFormId !== comment.id ? (
                        <div>
                          <div className="comment__data-block">
                            <span className="post__user">{comment.author}</span>
                            <span>{moment(comment.timestamp).fromNow()}</span>
                            <CommentActionButtons comment={comment} showCommentEditForm={this.showCommentEditForm}/>
                          </div>
                          <p>
                            {nl2br(comment.body)}
                          </p>
                        </div>
                        ) : (
                          <CommentEditForm comment={comment} showCommentEditForm={this.showCommentEditForm}/>
                        )
                      }
                    </div>
                  </div>
                )}
                </FlipMove>
              </div>
            </div>
            <CommentCreateForm postId={post.id}/>
          </div>
        )}
      </section>
    )
  }
}


function mapStateToProps({posts, comments}, ownProps) {

  let postId = ownProps.id;
  let post = posts.items.find(post => post.id === postId)

  return {
    post: post,
    comments: (comments[postId]) ? comments[postId].items.sort(sortBy(comments.sortBy)) : [],
    commentsSortBy: comments.sortBy
  }
}


function mapDispatchToProps(dispatch) {
  return {
    fetchCommentsIfNeeded: (postId) => dispatch(fetchCommentsIfNeeded(postId)),
    votePost: (id, option) => dispatch(votePost(id, option)),
    voteComment: (id, postId, option) => dispatch(voteComment(id, postId, option)),
    setCommentSortColumn: (columnName) => dispatch(setCommentSortColumn(columnName)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)