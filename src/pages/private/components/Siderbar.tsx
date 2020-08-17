import React from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import {
  UserOutlined,
  CustomerServiceOutlined,
  MessageOutlined,
  CarOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

export class App extends React.Component {
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
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          <SubMenu key="sub2" icon={<UserOutlined />} title="Member">
            <Menu.Item key="5">Account</Menu.Item>
          </SubMenu>
          <SubMenu key="sub1" icon={<CustomerServiceOutlined />} title="Customer">
            <Menu.Item key="1">Công ty gara, cứu hộ</Menu.Item>
            <Menu.Item key="2">Tài khoản chủ xe</Menu.Item>
            <Menu.Item key="3">Checklist</Menu.Item>
            <Menu.Item key="4">Tài khoản trải nghiệm</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<CarOutlined />} title="Hãng xe và mã lỗi">
            <Menu.Item key="6">Quản lý hãng xe</Menu.Item>
            <Menu.Item key="7">Quản lý nhóm xe</Menu.Item>
            <Menu.Item key="8">Quản lý bộ phận</Menu.Item>
            <Menu.Item key="9">Quản lý mã lỗi</Menu.Item>
            <Menu.Item key="10">Dữ liệu ECU</Menu.Item>
          </SubMenu>
          <Menu.Item key="4" icon={<MessageOutlined />}>
            Gửi tin nhắn
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}