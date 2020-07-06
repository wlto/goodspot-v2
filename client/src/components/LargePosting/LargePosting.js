import React, { Component } from 'react';
import Slider from 'react-slick';

import BookingForm from '../BookingForm/BookingForm';

import './LargePosting.css';

import DrivewayOne from '../../assets/driveway-1.jpg';
import DrivewayTwo from '../../assets/driveway-2.jpg';

export default class LargePosting extends Component {
  render() {
    const sliderSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    const { post } = this.props.location.state;

    // const post = {
    //   Address: "4848 Yonge St, North York",
    //   Available: true,
    //   FromTime: "2018-10-01T09:00:00.000Z",
    //   PostalCode: "M2N 5N2",
    //   PostingId: 1234,
    //   Price: 10,
    //   Title: "Good stop in North York. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae.",
    //   ToTime: "2018-10-01T17:00:00.000Z"
    // }

    return (
      <div className="LargePosting">
        <div className="carousel">
          <Slider {...sliderSettings}>
            <div className="carousel-item">
              <img src={DrivewayOne}/>
            </div>
            <div className="carousel-item carousel-item-1">
              <img src={DrivewayTwo}/>
            </div>
          </Slider>
        </div>
        <div className="content-container">
          <h1 className="address">{post.Address}</h1>
          <p className="description">{post.Title}</p>
          <p className="price">${post.Price.toFixed(2)} / day</p>
        </div>
        <div className="booking-form-container">
          <BookingForm posting={post} />
        </div>
      </div>
    );
  }
}
