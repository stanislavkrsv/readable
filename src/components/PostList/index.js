import React, { Component } from 'react'
import {NavLink, Link} from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import sortBy from 'sort-by'
import FlipMove from 'react-flip-move'
import { fetchCategoriesIfNeeded, setPostSortColumn, votePost } from '../../actions'

import Sort from '../Sort'
import Rating from '../Rating'
import CommentCount from './CommentCount'
import PostActionButtons from '../Post/PostActionButtons'


/**
 * Posts
 */
class PostList extends Component {

  state = {
    animation: 'fade',
    animationStaggerDelayBy: 30,
  }

  componentDidMount() {
    const { fetchCategoriesIfNeeded } = this.props
    fetchCategoriesIfNeeded()
  }

  render(){

    const { posts, categories, sortBy, setPostSortColumn, votePost, categoriesInit, postsInit } = this.props
    const { animation,  animationStaggerDelayBy } = this.state

    return(
      <section className="content">

        {/* Category list*/}
        <nav className="nav nav--left">
          {categoriesInit && categories.map((item) => <NavLink exact key={item.path} to={`/${item.path}`}>{item.name}</NavLink>)}
          {!categoriesInit && (<div className="nav--left__placeholder"/>)}
        </nav>


        {posts.length > 0 ? (
          <section className="posts">
            {/* Sort */}
            <Sort defaultValue={sortBy} onChangeFn={setPostSortColumn}/>
            {/* Posts */}
            <FlipMove  appearAnimation={animation}
                       enterAnimation={animation}
                       leaveAnimation={animation}
                       staggerDelayBy={animationStaggerDelayBy}
            >
              {posts.map((post) =>
                <article key={post.id} className="post">
                  {post.postBlocked === true && <div className="post__overlay"></div>}
                  <div className="post__wrapper">
                    {/* Post rating */}
                    <Rating voteScore={post.voteScore} voteFn={votePost} id={post.id}/>
                    <div className="post__text">
                      <Link to={`/${post.category}/${post.id}`} className="post__title">{post.title}</Link>
                      <div className="post__data-block">
                        <span className="post__user">{post.author}</span>
                        <span>{moment(post.timestamp).fromNow()}</span>
                        <Link to={`/${post.category}`}>{post.category}</Link>
                        <CommentCount post={post} />
                        <PostActionButtons post={post}/>
                      </div>
                    </div>
                  </div>
                </article>
              )}
            </FlipMove>
          </section>
        ) : (
            (postsInit === true) ? (<section className="posts posts--no-post-yet">No posts yet</section>) : (<section className="posts posts__placeholder"/>)
        )}
      </section>
    )
  }
}


function mapStateToProps({categories, posts}, ownProps) {
  const defaultCategory = [{name: 'All Categories', path: ''}]

  return {
    categories: defaultCategory.concat(
      categories.items
    ),
    posts: posts.items
      .filter((post) => post.deleted === false && (!ownProps.categoryId || post.category === ownProps.categoryId))
      .sort(sortBy(posts.sortBy)),
    sortBy: posts.sortBy,
    categoriesInit: categories.init,
    postsInit: posts.init
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategoriesIfNeeded: () => dispatch(fetchCategoriesIfNeeded()),
    setPostSortColumn: (columnName) => dispatch(setPostSortColumn(columnName)),
    votePost: (id, option) => dispatch(votePost(id, option)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)