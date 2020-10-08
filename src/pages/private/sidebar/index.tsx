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
          <SubMenu key="sub2" icon={<appIcon.UserOutlined />} title="Account">
            <Menu.Item key="2">
              <Link to="/staffs">Staffs</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/customers">Customers</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub1" icon={<appIcon.BuildOutlined />} title="Work bay">
            <Menu.Item key="1">
              <Link to="/companies">Companies</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            icon={<appIcon.CarOutlined />}
            title="Car brand and error"
          >
            <Menu.Item key="6">Car brands</Menu.Item>
            <Menu.Item key="7">Car group</Menu.Item>
            <Menu.Item key="8">Car Parts</Menu.Item>
            <Menu.Item key="9">Service Error</Menu.Item>
            <Menu.Item key="10">ECU Data</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
