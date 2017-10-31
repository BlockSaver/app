// @flow
import React from 'react';
import {connect} from "react-redux";

import LoadWalletForm from "../components/LoadWalletForm";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showKeyInput: false,
    };

    this.onLoadWalletClick = this.onLoadWalletClick.bind(this);
  }

  onLoadWalletClick() {
    this.setState({ showKeyInput: !this.state.showKeyInput })
  }

  render() {
    return (
      <div className="window-content">
        <div className="pane-group">
          <div className="pane pane-one-third sidebar">
            <button
              onClick={this.onLoadWalletClick}
              className="btn btn-large btn-default"
            >Load wallet</button>

            {this.state.showKeyInput ?
              <LoadWalletForm />
              : null}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null,
  (dispatch) => ({
  })
)(HomePage);
