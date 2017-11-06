import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {connect} from "react-redux";

class SavingsForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);

    this.state = {
      address: this.props.wallet ? this.props.wallet.address : '',
      endTime: moment(),
      amount: '',
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);

    if (this.state.endTime < moment()) {
      alert('Wrong saving date.');
    }
  }

  handleAddressChange(e) {
    this.setState({ address: e.target.value });
  }

  handleEndTimeChange(date) {
    this.setState({ endTime: date });
  }

  handleAmountChange(e) {
    this.setState({ amount: e.target.value });
  }

  render() {
    const { wallet } = this.props;

    return (
      <div className="window-content">
        <div className="pane-group">
          <div className="pane pane-one-third sidebar">
            <div className="margin-15">
              Create a new savings account and we will deduct each month the exact amount you entered.
            </div>

            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label className="Input">
                  Address for withdraw <br />
                  <input
                    type="text"
                    name="address"
                    value={wallet && wallet.address}
                    style={{ width: '280px' }}
                    onChange={this.handleAddressChange}
                  />
                </label>
              </div>

              <div className="form-group">
                <label className="Input">
                  Monthly amount (USD) <br />
                  <input
                    type="text"
                    name="amount"
                    placeholder="15"
                    style={{ width: '80px' }}
                    onChange={this.handleAmountChange}
                  />
                </label>
              </div>

              <div className="form-group">
                <label className="Input">
                  End time <br />
                  <DatePicker
                    selected={this.state.endTime}
                    onChange={this.handleEndTimeChange}
                  />
                </label>
              </div>

              <button className="btn btn-large btn-primary">Save</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    wallet: state.wallet,
  }),
  ({
  })
)(SavingsForm);
