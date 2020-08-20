import React from 'react';
import './style.less';
import { Link } from 'umi';

interface SignUpProps {
  name?: any;
  value?: any;
}

interface SignUpState {
  phone: string;
  password: string;
  errors: {
    phone: string;
    password: string;
  };
}
const Regex = RegExp(
  /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/,
);

export default class SignUp extends React.Component<SignUpProps, SignUpState> {
  constructor(props: SignUpProps) {
    super(props);
    const initialState = {
      phone: '',
      password: '',
      errors: {
        phone: '',
        password: '',
      },
    };
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case 'phone':
        errors.phone = Regex.test(value) ? '' : 'Number is not valid!';
        break;
      case 'password':
        errors.password =
          value.length < 8 ? 'Password must be eight characters long!' : '';
        break;
      default:
        break;
    }
    this.setState(Object.assign(this.state, { errors, [name]: value }));
    console.log(this.state.errors);
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    let validity = true;
    Object.values(this.state.errors).forEach(
      val => val.length > 0 && (validity = false),
    );
    if (validity == true) {
      console.log('Registering can be done');
    } else {
      console.log('You cannot be registered!!!');
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h2>Sign Up</h2>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="phone">
              <label htmlFor="phone">Phone</label>
              <input type="phone" name="phone" onChange={this.handleChange} />
              {errors.phone.length > 0 && (
                <span style={{ color: 'red' }}>{errors.phone}</span>
              )}
            </div>

            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={this.handleChange}
              />
              {errors.password.length > 0 && (
                <span style={{ color: 'red' }}>{errors.password}</span>
              )}
            </div>

            <div className="submit">
              <button>Register Me</button>
            </div>
            <Link to="/login">Sign in with your account</Link>
          </form>
        </div>
      </div>
    );
  }
}
