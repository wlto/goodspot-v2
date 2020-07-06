import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import datepicker from 'js-datepicker';

import './BookingForm.css';

export default class BookingForm extends Component {
  state = {
    formCompleted: false
  }

  submit = (e) => {
    e.preventDefault();
    const submissionData = {
      name: this.userName.value,
      email: this.userEmail.value,
      phone: this.userPhone.value,
      license: this.userLicensePlate.value,
      startTime: this.bookDate.value,
      endTime: this.bookDate.value,
      postingId: this.props.posting.PostingId
    }

    const url = `${process.env.REACT_APP_API_ENDPOINT}/submit`;
    console.log(submissionData);

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        submission: submissionData
      }),
      headers: {"Content-Type": "application/json"},
      mode: 'cors',
    })
    .then((response) =>  {
      return response.json();
    })
    .then((data) => {
      this.setState({
        formCompleted: true
      })
    })
    .catch((error) => {
      console.log('Request failed', error);
    });
  }

  render() {
    if (this.state.formCompleted) {
      return <Redirect to="/confirmation" />
    }

    return (
      <div className="BookingForm">
        <h2>Book this slot now</h2>
        <form onSubmit={this.submit}>
          <table>
            <tr className="form-row">
              <td>Name</td>
              <td><input id="name" type="text" name="name" ref={(node) => this.userName = node} /></td>
            </tr>

            <tr className="form-row">
              <td>Email</td>
              <td><input id="email" type="text" name="email" ref={(node) => this.userEmail = node} /></td>
            </tr>

            <tr className="form-row">
              <td>Phone</td>
              <td><input id="phone" type="text" name="phone" ref={(node) => this.userPhone = node} /></td>
            </tr>

            <tr className="form-row">
              <td>License Plate</td>
              <td><input id="license" type="text" name="license" ref={(node) => this.userLicensePlate = node} /></td>
            </tr>

            <tr className="form-row">
              <td>Date</td>
              <td><input id="bookDate" type="date" name="bookDate" ref={(node) => this.bookDate = node} /></td>
            </tr>
          </table>

          <input type="submit" value="Submit" className="form-submit" />
        </form>
      </div>
    );
  }
}