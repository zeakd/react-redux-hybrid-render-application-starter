import React from 'react';
import Header from '../../components/Header';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Header title="Title" />
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
