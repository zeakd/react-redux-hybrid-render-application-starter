import React from 'react';
import Header from '../../components/Header';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Header title="Arty Developer" />
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
