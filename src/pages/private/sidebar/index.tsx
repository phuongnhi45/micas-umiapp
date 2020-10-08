import React from 'react';
import { Menu } from 'antd';
import { Link } from 'umi';

import styles from '../index.less';
import appIcon from '@/config/icons';
import logo from '../../../assets/images/logo.png';

const { SubMenu } = Menu;

export class Sidebar extends React.Component {
  state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <div>
        <div className={styles.micas}>
          <img className={styles.logo} src={logo} alt="micas" />
        </div>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          <SubMenu key="sub2" icon={<appIcon.UserOutlined />} title="Member">
            <Menu.Item key="5">
              <Link to="/staff">Account</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub1"
            icon={<appIcon.CustomerServiceOutlined />}
            title="Customer"
          >
            <Menu.Item key="3">
              <Link to="/companies">Companies</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/car-owners">Car owners</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            icon={<appIcon.CarOutlined />}
            title="Hãng xe và mã lỗi"
          >
            <Menu.Item key="6">Quản lý hãng xe</Menu.Item>
            <Menu.Item key="7">Quản lý nhóm xe</Menu.Item>
            <Menu.Item key="8">Quản lý bộ phận</Menu.Item>
            <Menu.Item key="9">Quản lý mã lỗi</Menu.Item>
            <Menu.Item key="10">Dữ liệu ECU</Menu.Item>
          </SubMenu>
          <Menu.Item key="11" icon={<appIcon.MessageOutlined />}>
            Gửi tin nhắn
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}
