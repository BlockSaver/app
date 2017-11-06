import React from 'react';
import {Link} from "react-router-dom";

export class Header extends React.Component {
  render() {
    return (
      <header className="toolbar toolbar-header">
        <h1 className="title">Home</h1>

        <div className="toolbar-actions">
          <Link to="/">
            <button className="btn btn-default">
              <span className="icon icon-home"></span>
            </button>
          </Link>

          <div className="btn-group">
            <Link to="/savings">
              <button className="btn btn-default">
                <span className="icon icon-clipboard icon-text"></span>
                Savings
              </button>
            </Link>

            <Link to="/settings">
              <button className="btn btn-default">
                <span className="icon icon-cog icon-text"></span>
                Settings
              </button>
            </Link>
          </div>

          <Link to="/savings/new">
            <button className="btn btn-default pull-right">
              <span className="icon icon-plus icon-text"></span>
              New
            </button>
          </Link>
        </div>
      </header>
    );
  }
}
