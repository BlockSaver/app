import React from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
  injectStripe,
} from "react-stripe-elements";
import {connect} from "react-redux";
import {postCardDetails} from "../actions/settings";
import {bindActionCreators} from "redux";

class CardForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      card: {
        number: '',
        exp: '',
        cvv: ''
      },
      user: {}
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({'name': "Pero Peric"}).then((response) => {
      if (response.error) {
        alert(response.error.message);
      }

      console.log('Received Stripe token:', response.token);
      this.props.postCardDetails(response.token);
    });
  }

  render() {
    const options = {
      style: {
        base: {
          fontSize: 18,
          color: '#424770',
          letterSpacing: '0.025em',
          fontFamily: 'Source Code Pro, Menlo, monospace',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#9e2146',
        },
      },
    };

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label style={{ width: "240px" }}>
            Card number
            <CardNumberElement {...options} />
          </label>
        </div>

        <div className="form-group">
          <label>
            Expiration date
            <CardExpiryElement {...options} />
          </label>

          <label className="margin-15-horizontal" style={{ width: "60px" }}>
            CVC
            <CardCVCElement {...options} />
          </label>
        </div>

        <div className="form-group">
          <label>
            Postal code
            <PostalCodeElement {...options} />
          </label>
        </div>

        <button className="btn btn-large btn-primary">Save</button>
      </form>
    )
  }
}

const CardFormRedux = connect(
  null, {
    postCardDetails,
  })(CardForm);

export default injectStripe(CardFormRedux);
