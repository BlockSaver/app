import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {connect} from "react-redux";
import {Elements} from 'react-stripe-elements';

import CardForm from "../components/CardForm";
import {createNewSavings} from "../actions/savings";

class SavingsForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.handleIntervalChange = this.handleIntervalChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);

    this.state = {
      address: this.props.wallet ? this.props.wallet.address : '',
      endTime: moment(),
      amount: 15,
      name: '',
      interval: 1,
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.endTime < moment()) {
      alert('Wrong saving date.');
      return false;
    }

    this.props.createNewSavings(this.state, this.props.wallet.privateKey);
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

  handleIntervalChange(e) {
    this.setState({ interval: e.target.value });
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  componentWillMount() {
    if (!this.props.wallet.address) {
      alert('To see existings savings, wallet must be loaded!');
      this.props.history.push('/');
    }
  }

  render() {
    const { wallet } = this.props;
    const currentDate = new Date();
    const endDate = new Date(this.state.endTime);
    const estimatedEarnings = new Date(currentDate.getTime() - endDate.getTime()).getMonth() * 0.1 * this.state.amount;

    return (
      <div className="window-content">
        <div className="pane-group">
          <div className="pane pane-one-third sidebar">
            <div className="center">
              <div className="center" style={{ width: "50%"}}>
                <p className="center margin-15-horizontal" style={{ marginLeft: "50px"}}>
                  Create a new savings account and we will deduct each month the exact amount you entered.
                </p>
                <img
                  style={{ marginBottom: "-50px"}}
                  src="../resources/piggyanimated2.gif"
                  alt="Piggy bank"
                  height="250"
                />
              </div>
            </div>

            <br />

            <form onSubmit={this.handleSubmit}>
              <div className="columncontainer">
                <div className="column">
                  <div className="form-group">
                    <label className="Input">
                      Savings name <br />
                      <input
                        type="text"
                        name="name"
                        style={{ width: '280px' }}
                        onChange={this.handleNameChange}
                      />
                    </label>

                    <br />

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

                  <div className="form-group" style={{ width: '280px' }}>
                    <label className="Input" style={{ width: '280px' }}>
                      End time <br />
                      <DatePicker
                        selected={this.state.endTime}
                        onChange={this.handleEndTimeChange}
                        showTimeSelect
                        dateFormat="LLL"
                        timeIntervals={2}
                      />
                    </label>
                  </div>

                  <div className="form-group">
                      <label className="Input">
                        Interval between payments <br />
                        <input
                          type="text"
                          name="interval"
                          placeholder="Enter minutes for testing phase"
                          style={{ width: '280px' }}
                          onChange={this.handleIntervalChange}
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
                        style={{ width: '280px' }}
                        onChange={this.handleAmountChange}
                      />
                    </label>
                  </div>
                </div>

                <div className="column">
                  <p>Payment details</p>
                  <Elements>
                    <CardForm />
                  </Elements>

                  <p style={{ color: "#686868"}}>{`Estimated earnings: ${estimatedEarnings} NEO`}</p>
                </div>
              </div>
              <button className="btn btn-large btn-primary" style={{ marginLeft: "50%"}}>Save</button>
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
    createNewSavings,
  })
)(SavingsForm);
