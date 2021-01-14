import React, { Component } from 'react';
import { connect } from 'react-redux';

class ReduxTest extends Component {

    state = {
        value: '',
        postId: 1
    };

    handleChange = event => {
        this.setState({ value: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_POSTS',
            payload: { id: this.state.postId, title: this.state.value }
        });
        this.setState({ value: "",postId: this.state.postId + 1 });
    };

    render() {
        // console.log("props", this.props);
        // console.log('state', this.state);
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                    <div>
                        <button type="submit" onClick={this.handleSubmit}>
                            Submit
              </button>
                    </div>
                </form>
                <ul>
                    {this.props.posts.map(post => (
                        <li key={post.id}>{post.title}</li>
                    ))}
                </ul>
            </>
        )
    }
}

const mapStateToProps = state => {
    return { posts: state.posts }
}

const mapDispatchToProps = dispatch => {
    return {
      dispatch
    }
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(ReduxTest)