import React from 'react';
import { Layout, Button } from 'antd';
import { connect } from 'umi';

import { AppState } from '../../models/app';
import { Sidebar } from './sidebar/index';

import appIcon from '@/config/icons';
import styles from './index.less';

const { Header, Sider, Content } = Layout;

class UserStaff extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  logout = () => {
    this.props.dispatch({
      type: 'app/logout',
    });
  };

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <Sidebar />
        </Sider>

        <Layout>
          <Header className={styles.header}>
            <div className={styles.trigger}>
              {React.createElement(
                this.state.collapsed
                  ? appIcon.MenuUnfoldOutlined
                  : appIcon.MenuFoldOutlined,
                {
                  className: 'trigger',
                  onClick: this.toggle,
                },
              )}
              {''}
            </div>
            <div className={styles.header_right}>
              <Button
                className={styles.logout}
                icon={<appIcon.LogoutOutlined />}
                onClick={this.logout}
              />
            </div>
          </Header>
          <Content
            style={{
              margin: '0 24px',
              minHeight: 732,
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default connect(({ app }: { app: AppState }) => ({ app }))(UserStaff);
