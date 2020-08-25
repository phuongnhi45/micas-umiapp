import React from 'react';
import { Layout, Row, Button, Breadcrumb } from 'antd';
import { connect } from 'umi';
import styles from './index.less';
import { AppState } from '../../models/app';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ShopOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Sidebar } from './sidebar/index';

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
                this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
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
            style={{
              margin: '0 24px 24px',
              minHeight: 1000,
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
