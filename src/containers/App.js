import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { fetchPostsIfNeeded } from './../actions'
import Header from './../components/Header'
import Footer from './../components/Footer'
import PostList from './../components/PostList'
import Post from './../components/Post'
import NewPost from './../components/Post/NewPost'
import EditPost from './../components/Post/EditPost'

class App extends Component {

  componentDidMount() {
    const { fetchPostsIfNeeded } = this.props
    fetchPostsIfNeeded();
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>

          {/* Main page */}
          <Route exact path='/' render={() => (
            <PostList/>
          )} />

          {/* Create post */}
          <Route exact path='/new' render={() => (
            <NewPost />
          )} />

          {/* Edit post */}
          <Route exact path='/:categoryId/:id/edit' render={(match) => (
            <EditPost id={match.match.params.id} />
          )} />

          {/* Show post */}
          <Route exact path='/:categoryId/:id' render={(match) => (
            <Post id={match.match.params.id}/>
          )} />

          {/* Category */}
          <Route path='/:categoryId' render={(match) => (
            <PostList categoryId={match.match.params.categoryId} />
          )} />

        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(null, { fetchPostsIfNeeded })(App))