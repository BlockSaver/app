import React from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router";

import {loadWallet} from "../actions/wallet";


class LoadWalletForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyChange = this.handleKeyChange.bind(this);

    this.state = {
      privateKey: '',
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.loadWallet(this.state.privateKey);
  }

  handleKeyChange(e) {
    const privateKey = e.target.value;
    this.setState({ privateKey });
  }

  render() {
    const { wallet } = this.props;

    if (wallet && wallet.address ) {
      return (
        <div>Successfully loaded: {wallet.address}.</div>
      );
    } else {
      return (
        <form onSubmit={this.handleSubmit}>
          <div className="form-control margin-15-vertical">
            <input
              type="text"
              name="wif"
              placeholder="Enter private key (WIF)"
              onChange={this.handleKeyChange}
              style={{ width: "100%" }}
            />
          </div>

          <button className="btn btn-positive btn-large">Login</button>
        </form>
      );
    }
  }
}

export default connect(
  (state) => ({
    wallet: state.wallet,
  }),{
    loadWallet,
  })(LoadWalletForm);
