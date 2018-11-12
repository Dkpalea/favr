import React, {Component} from 'react';
import Navbar from './Navbar';

class NotFoundPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <span>I&#39;m sorry, the page you&#39;re looking for could not be found :(</span>
      </div>
    );
  }
}

export default NotFoundPage;
