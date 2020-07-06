import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './PostingList.css';

export default class PostingList extends Component {
  constructor(props){
    super(props);
    this.state = {
      distanceFromLocation: 2000, // in meters
      postings: []
    }
  }

  componentDidMount() {
    this.fetchPostings();
  }
  
  fetchPostings() {
    const { address } = this.props.location.state;
    // const address = '4800 Yonge Street';
    const url = `${process.env.REACT_APP_API_ENDPOINT}/testdistance`;

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        address: address,
        distanceFromLocation: this.state.distanceFromLocation
      }),
      headers: {"Content-Type": "application/json"},
      mode: 'cors',
    })
    .then((response) =>  {
      return response.json();
    })
    .then((data) => {
      this.setState({
        postings: data
      })
    })
    .catch((error) => {
      console.log('Request failed', error);
    });
  }

  handleFilterSubmit = (e) => {
    e.preventDefault();
    this.setState({
      distanceFromLocation: parseInt(this.distanceInput.value, 10)
    }, () => {
      this.fetchPostings();
    });
  }

  render() {
    const { address } = this.props.location.state;
    console.log('length -- ' + this.state.postings.length);
    return (
      <div className="PostingList">
        <h1 className="user-address">{address != "" ? address : "4800 Yonge Street (Default)"}</h1>
        <div className="list-filter">
          Distance from location: <input type="number" ref={(node) => {this.distanceInput = node}}></input> meters
          <button onClick={this.handleFilterSubmit}>Refresh</button>
        </div>
        <ul>
          {this.state.postings.map((posting, i) => {
            const fromTime = (new Date(posting.FromTime)).getHours();
            const toTime = (new Date(posting.ToTime)).getHours();
            
            return (
              <li key={i}>
                <Link to={{
                  pathname: '/posting',
                  state: {
                    post: posting
                  }
                }} className="posting">
                  <h2>{posting.Address}</h2>
                  <p>Price: ${posting.Price.toFixed(2)}</p>
                  <p>Availability:<br></br>{fromTime}:00 - {toTime}:00</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}