import React from 'react';

export class UserDetailsForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);

    this.state = {
      email: "",
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
  }

  handleEmailChange(e) {
    const email = e.target.value;
    this.setState({email});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="Input">
            Email <br />
            <input
              type="email"
              name="email"
              style={{ width: "240px" }}
              onChange={this.handleEmailChange}
            />
          </label>
        </div>

        <button className="btn btn-large btn-primary">Save</button>
      </form>
    )
  }
}
