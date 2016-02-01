/* 
 * Example for component that include client only component
 */

import React from 'react';

import MarkdownEditor from '../../client/containers/MarkdownEditor';

export default class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstRender: true
        }
    }

    render() {
        return (
            <div>
                <h1>Editor!</h1>
                {this.state.firstRender ? 
                    null : <MarkdownEditor />
                }
            </div>
        );
    }

    componentDidMount() {
        this.setState({firstRender: false});
    }
}
