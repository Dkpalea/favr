import React, { Component } from 'react';
import Favr from './Favr';

class Feed extends Component {

  constructor(props) {
    super(props);
    this.state = {favrs: [{id: 1}, {id: 2}, {id: 3}, {id: 4}]};
  }

  render() {

    const {favrs} = this.state;

    const favrComponents = favrs.map(favr => {
      console.log(myMessage);
      return (
        <div key={favr.id} className="favrs-container">
          <div className="favr-in-feed">
            <Favr />
          </div>
          <hr />
        </div>
      );
    });
    return (
      <div className="main-feed">
        {favrComponents}
      </div>
    );
  }
}

export default Feed;
