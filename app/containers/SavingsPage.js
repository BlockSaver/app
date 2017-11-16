import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class SavingsPage extends React.Component {
  componentWillMount() {
    if (!this.props.wallet.address) {
      alert('To see existings savings, wallet must be loaded!');
      this.props.history.push('/');
    }
  }

  handleClick(date, amount) {
    const currentDate = new Date();
    const amountToWithdraw = new Date(currentDate.getTime() - date.getTime()).getMonth() * 0.1 * 0.9 * amount;

    if (confirm(`If you cut your savings now you will get only ${amountToWithdraw} NEO. Are you sure`)) {
      // Close savings and transfer to user wallet
    }
  }

  render() {
    const date1 = new Date("11.29.2017 19:00");
    const date2 = new Date("12.3.2017 12:00");

    return (
      <div className="window-content">
        <div className="pane-group">
          <div className="pane pane-one-third sidebar">
            <p className="no-margin">Currently active savings: </p>

            <ul className="list-group">
              <li className="list-group-item"></li>

              <li className="list-group-item">
                <div className="media-body">
                  <strong className="active">Active</strong>
                  <strong> until {date1.toUTCString()}</strong>
                  <p>Trip to Paris.</p>
                </div>

                <div className="column">
                  <span style={{ color: "green", textAlign: "end" }}>20 NEO and 0.2 GAS</span>

                  <button
                    className="btn btn-default btn-small"
                    style={{ height: "30px" }}
                    onClick={() => this.handleClick(date1, 20)}
                  >
                    Ask for withdrawal
                  </button>
                </div>
              </li>

              <li className="list-group-item">
                <div className="media-body">
                  <strong className="active">Active</strong>
                  <strong> until {date2.toUTCString()}</strong>
                  <p>Mom's birthday.</p>
                </div>

                <div className="column">
                  <span style={{ color: "green", textAlign: "end" }}>70 NEO and 1 GAS</span>

                  <button
                    className="btn btn-default btn-small"
                    style={{ height: "30px"}}
                    onClick={() => this.handleClick(date2, 70)}
                  >
                    Ask for withdrawal
                  </button>
                </div>
              </li>

              <li className="list-group-item"></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

SavingsPage.propTypes = {
  wallet: PropTypes.shape({
    address: PropTypes.string,
    privateKey: PropTypes.string,
    programHash: PropTypes.string,
    publicKeyEncoded: PropTypes.string,
    publicKeyHash: PropTypes.string
  }),
// eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired
};


export default connect(
  (state) => ({
    wallet: state.wallet,
  }))(SavingsPage);
