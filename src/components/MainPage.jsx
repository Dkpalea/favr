import React, {Component} from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import AuthButton from "./AuthButton";
import AcceptButton from "./accept_button";
import FirebaseTestComponent from "./FirebaseTestComponent";

class MainPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    const {
      match: {
        topicLabel,
      },
    }
     = this.props;
    return (
      <div>
        <AuthButton />
        <AcceptButton />
        <FirebaseTestComponent />
        <span>{topicLabel}</span>
        <span>db.</span>
      </div>
    );
  }
}

MainPage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default MainPage;
