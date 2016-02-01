import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import Devtools from '../../client/containers/Devtools';


export default class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstRender: true
        }
    }

    render() {
        let devtools;
        if(this.state.firstRender) {
            devtools = null;
        } else {
            devtools = <Devtools />
        }
        return (
            <Provider store={this.props.store}>
                <div>
                    <Router history={this.props.history}>{this.props.children}</Router>
                    {devtools}
                </div>
            </Provider>
        );
    }

    componentDidMount() {
        this.setState({firstRender: false});    
    }
}
