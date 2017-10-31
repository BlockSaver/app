import React from 'react';
import {connect} from "react-redux";
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

export default connect(
  null, {
    loadWallet,
  })(LoadWalletForm);
