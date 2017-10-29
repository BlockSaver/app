// @flow
import React, { Component } from 'react';
import type { Children } from 'react';

import {Header} from "../components/Header";

export default class App extends Component {
  props: {
    children: Children
  };

  render() {
    return (
      <div className="window">
        <Header />

        {this.props.children}
      </div>
    );
  }
}
