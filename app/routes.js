/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import { StripeProvider } from 'react-stripe-elements';

import App from './containers/App';
import HomePage from './containers/HomePage';
import SavingsPage from './containers/SavingsPage';
import SettingsPage from './containers/SettingsPage';
import CounterPage from './containers/CounterPage';
import SavingsForm from './containers/AddNewSaving';

export default () => (
  <StripeProvider apiKey="pk_test_iV3fX2RwYAeC2L2DcmIEvBTL">
    <App>
      <Switch>
        <Route path="/counter" component={CounterPage} />
        <Route exact path="/savings/new" component={SavingsForm} />
        <Route path="/savings" component={SavingsPage} />
        <Route path="/settings" component={SettingsPage} />

        <Route path="/" component={HomePage} />
      </Switch>
    </App>
  </StripeProvider>
);
