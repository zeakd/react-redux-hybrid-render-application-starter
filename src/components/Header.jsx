import React from 'react';
import { Link } from 'react-router';
import './Header.scss';

export default class header extends React.Component {
    render() {
        return (
            <header id='#header'>
                <Link to='/'>{this.props.title}</Link>
                <nav>
                    <Link to='/blog'>Blog</Link>
                </nav>
            </header>
        );
    }
}
