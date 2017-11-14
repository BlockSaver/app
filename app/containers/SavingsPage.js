import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class SavingsPage extends React.Component {

  constructor(props) {
    super(props);
    const { wallet, history } = this.props;
    this.wallet = wallet;
    this.history = history;
  }

  componentWillMount() {
    console.log('wallet:', this.wallet);
    if (this.wallet === null) {
      console.log('need wallet loading');
      this.history.push('/');
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

SavingsPage.defaultProps = {
  wallet: {
    test: 'test'
  }
};

export default connect(
  (state) => ({
    wallet: state.wallet,
  }))(SavingsPage);
