import React from 'react';
import './style.less';
import { connect } from 'umi';
import { Redirect } from 'react-router';
import { Link } from 'umi';
import { Input, Button } from 'antd';
import { PhoneOutlined, LockOutlined } from '@ant-design/icons';

interface SignInProps {
  name?: any;
  value?: any;
  // login: LoginState;
}

interface SignInState {
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

export class SignIn extends React.Component<SignInProps, SignInState> {
  constructor(props: SignInProps) {
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

  requestLogin = () => {
    // <Redirect to='/home'/>
  };

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
      return <Redirect to="/home" />;
    } else {
      console.log('You cannot be registered!!!');
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="phone">
              <Input
                size="large"
                prefix={<PhoneOutlined />}
                type="phone"
                name="phone"
                onChange={this.handleChange}
              />
              {errors.phone.length > 0 && (
                <span style={{ color: 'red' }}>{errors.phone}</span>
              )}
            </div>

            <div className="password">
              <Input
                type="password"
                name="password"
                onChange={this.handleChange}
                size="large"
                prefix={<LockOutlined />}
              />
              {errors.password.length > 0 && (
                <span style={{ color: 'red' }}>{errors.password}</span>
              )}
            </div>

            <div className="submit">
              <Button onClick={this.requestLogin} type="primary" block>
                Sign In
              </Button>
            </div>
            <Link to="/register">Create new account</Link>
          </form>
        </div>
      </div>
    );
  }
}
export default connect(({ login }: any) => ({
  login,
}))(SignIn);
