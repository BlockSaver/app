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

  render() {
    return (
      <div className="window-content">
        <div className="pane-group">
          <div className="pane pane-one-third sidebar">
            <ul className="list-group">
              <li className="list-group-item">
                <div className="media-body">
                  <strong>List item title</strong>
                  <p>Lorem ipsum dolor sit amet.</p>
                </div>
              </li>

              <li className="list-group-item">
                <div className="media-body">
                  <strong>List item title</strong>
                  <p>Lorem ipsum dolor sit amet.</p>
                </div>
              </li>
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
