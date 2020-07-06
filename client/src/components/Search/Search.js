import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import './Search.css';

export default class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      userInput: ''
    };
  }

  handleSearchTextChange = (e) => {
    this.setState({
      userInput: e.target.value
    });
  }

  render() {
    return (
      <div className="Search">
        <h1>GoodSp●t</h1>
        <div className="search-box">
          <input
            type ="text"
            placeholder="Enter location"
            autoFocus={true}
            value={this.state.userInput}
            onChange={this.handleSearchTextChange}
          />
          <Link to={{
            pathname: '/postings',
            state: {
              address: this.state.userInput
            }
          }}>
            Search
          </Link>
        </div>
        <p className="Search-repo-link">Repository link: &nbsp;
          <a href="https://github.com/wlto/goodspot-v2" target="_blank">GitHub</a>
        </p>
      </div>
    )
  }
}

