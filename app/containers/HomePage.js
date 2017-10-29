// @flow
import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {testneo} from "../actions/blockchain";

class HomePage extends React.Component {
  render() {
    this.props.testneo();

    return (
      <div className="window-content">
        Some dashboard stuff here.
      </div>
    );
  }
}

export default connect(null,
  (dispatch) => ({
    testneo: bindActionCreators(testneo, dispatch),
  })
)(HomePage);
