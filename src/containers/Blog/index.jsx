import React from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import PreviewSection from '../../components/PreviewSection';

export default class Blog extends React.Component {
    render() {
        const { dispatch, push } = this.props;
        return (
            <div>
                <h1> Blog! </h1>
                <button onClick={() => dispatch(push('/editor'))}>Post</button>
                <ul>
                    {this.props.posts.map((post) => {
                        return <PreviewSection key={post.id}/>
                    })}
                </ul>
            </div>
        );
    }
}

Blog.defaultProps = { posts: [{id: 1}, {id : 2}] };

function select(state) {
    return {
        push: routeActions.push   
    }
}

export default connect(select)(Blog);