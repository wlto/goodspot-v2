import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Confirmation.css';

export default class Confirmation extends Component {
    render() {
        return (
            <div className="Confirmation">
                <div className="container">
                    <p><span>Thank you</span> choosing our spot!</p>
                    <Link className="back-to-home" to='/'>Back to homepage</Link>
                </div>
            </div>
        )
    }
}