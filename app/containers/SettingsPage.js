import React from 'react';
import {StripeProvider, Elements} from 'react-stripe-elements';

import CardForm from '../components/CardForm';
import {UserDetailsForm} from "../components/UserDetailsForm";

export default class SettingsPage extends React.Component {
  render() {
    return (
      <div className="window-content">
        <div className="pane-group">
          <div className="pane pane-one-third sidebar">
            <label style={{ fontSize: 20 }}>User details</label>
            <UserDetailsForm />

            <br />

            <label style={{ fontSize: 20 }}>Credit card</label>

            <Elements>
              <CardForm />
            </Elements>
          </div>
        </div>
      </div>
    );
  }
}


