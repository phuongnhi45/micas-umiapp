import React from 'react';
import { App } from '../sider';
import { Layout, Row, Button, Breadcrumb } from 'antd';
import { ConnectProps, Dispatch } from 'umi';
import styles from '../index.less';
import 'antd/dist/antd.css';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  ShopOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

export interface PageProps extends ConnectProps {
  dispatch: Dispatch;
}

const { Header, Sider, Content } = Layout;

class UserStaff extends React.Component<PageProps, any> {
  state = {
    collapsed: false,
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'login/init',
    });
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  logout = () => {
    this.props.dispatch({
      type: 'login/logout',
    });
  };

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className={styles.micas}>
            <img
              className={styles.logo}
              src="data:image/png;base64,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"
              alt="micas"
            />
          </div>
          <App />
        </Sider>

        <Layout>
          <Header className={styles.header}>
            <div className={styles.trigger}>
              {React.createElement(
                this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: 'trigger',
                  onClick: this.toggle,
                },
              )}{' '}
            </div>
            <div className={styles.header_right}>
              <Button icon={<UserOutlined />} className={styles.intern}>
                Intern
              </Button>
              <Button
                className={styles.logout}
                icon={<LogoutOutlined />}
                onClick={this.logout}
              />
            </div>
          </Header>

          <Row className={styles.row}>
            <Breadcrumb className={styles.breadcrumb}>
              <ShopOutlined style={{ color: '#1890ff' }} /> CÔNG TY GARA, CỨU HỘ
            </Breadcrumb>
            <div style={{ height: '100%' }}>
              <Button
                type="primary"
                style={{ color: 'white' }}
                // onClick={() => openModal()}
              >
                New Company
              </Button>
            </div>
          </Row>

          <Content
            className={styles.background}
            style={{
              margin: '0 24px 24px',
              padding: 24,
              minHeight: 1000,
            }}
          ></Content>
        </Layout>
      </Layout>
    );
  }
}

export default UserStaff;
