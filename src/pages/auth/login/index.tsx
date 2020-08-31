import React from 'react';
import { connect, Loading, ConnectProps, Dispatch, Link } from 'umi';
import { Input, Button, Form } from 'antd';
import { Redirect } from 'umi';

import appIcon from '@/config/icons';
import { LoginState } from './model';

import styles from './style.less';

export interface SignInProps extends ConnectProps {
  login: LoginState;
  dispatch: Dispatch;
  loading: boolean;
}

class SignIn extends React.Component<SignInProps, any> {
  handleSubmit = async (value: any) => {
    this.props.dispatch({
      type: 'login/submitlogin',
      payload: value,
    });
  };
  render() {
    const isLogin = localStorage.getItem('accessToken');
    return isLogin ? (
      <Redirect to="/service-places" />
    ) : (
      <div className={styles.wrapper}>
        <Form
          name="normal_login"
          style={{ padding: '20px 40px' }}
          className={styles.form1}
          onFinish={this.handleSubmit}
        >
          <Form.Item name="phone">
            <Input
              size="large"
              type="phone"
              prefix={<appIcon.PhoneOutlined />}
            />
          </Form.Item>
          <Form.Item name="password">
            <Input
              size="large"
              type="password"
              prefix={<appIcon.LockOutlined />}
            />
          </Form.Item>
          <Form.Item className="submit">
            <Button type="primary" htmlType="submit">
              Sign In
            </Button>
          </Form.Item>
          <Link to="/register">Create new account</Link>
        </Form>
      </div>
    );
  }
}

export default connect(
  ({ login, loading }: { login: LoginState; loading: Loading }) => ({
    login,
    loading: loading.models.login,
  }),
)(SignIn);
