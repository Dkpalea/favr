import React, {Component} from 'react';
import Feed from './Feed';
import Navbar from "./Navbar";

class MainPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    const now = new Date(Date.now() + 100000);
    return (
      <div className="main-page-container">
        <Navbar />
        <div className="main-feed-container">
          <Feed feedFavrs={[{
            favrId: `123`,
            title: `myTitle`,
            details: `myDetails`,
            pickupLocation: `fromHere`,
            dropoffLocation: `toThere`,
            expirationTime: now,
            REFrequestedBy: {
              email: `12345@12345.com`,
              profilePicCode: ``,
              firstName: `firstName`,
              lastName: `lastName`,
            },
            REFfulFilledBy: {
              email: `1234@1234.com`,
              profilePicCode: ``,
              firstName: `Dustin`,
              lastName: `Palea`,
            },
            requestAmount: 12,
          },
          {
            favrId: `1234`,
            title: `myTitle`,
            details: `myDetails`,
            pickupLocation: `fromHere`,
            dropoffLocation: `toThere`,
            expirationTime: now,
            REFrequestedBy: {
              email: `12345@12345.com`,
              profilePicCode: ``,
              firstName: `firstName`,
              lastName: `lastName`,
            },
            REFfulFilledBy: {
              email: `1234@1234.com`,
              profilePicCode: ``,
              firstName: `Dustin`,
              lastName: `Palea`,
            },
            requestAmount: 12,
          },
          ]}
          />
        </div>
      </div>
    );
  }
}

export default MainPage;
