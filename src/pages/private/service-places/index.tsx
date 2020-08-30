import React from 'react';
import styles from '../index.less';
import {
  Row,
  Col,
  Input,
  Select,
  Table,
  Breadcrumb,
  Tag,
  Checkbox,
  DatePicker,
  Tooltip,
} from 'antd';

import appIcon from '@/config/icons';
import { Link } from 'umi';

const { Search } = Input;
const { Option } = Select;

const columns = [
  {
    title: '#',
    dataIndex: 'index',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    // render: text => <Link to="/booking">{text}</Link>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
  },
  {
    title: 'City',
    dataIndex: 'city',
    render: () => <Tag color="blue">da-nang</Tag>,
  },
  {
    title: 'Created at',
    dataIndex: 'date',
    // render: () => <DatePicker/>
  },
  {
    title: 'Active',
    dataIndex: 'active',
    render: () => <Checkbox />,
  },
  {
    render: () => (
      <Tooltip placement="top" title="Change logo">
        <appIcon.EditOutlined />
      </Tooltip>
    ),
  },
];
const data: Item[] = [];

for (let i = 1; i < 21; i++) {
  data.push({
    key: i.toString(),
    name: `Edward King ${i}`,
    phone: `0989 123 2${i}`,
    index: `${i}`,
    email: `${i}@gmail.com`,
    address: `London, Park Lane no. ${i}`,
    city: '',
    date: '16/06/2020, 17:28',
  });
}

interface Item {
  key: string;
  name: string;
  email: string;
  phone: string;
  index: string;
  address: string;
  city: string;
  date: string;
}

export default class ServicePlace extends React.Component {
  handleChange(value: any) {
    console.log(`Selected: ${value}`);
  }
  render() {
    return (
      <>
        <Row className={styles.row}>
          <Breadcrumb className={styles.breadcrumb}>
            <appIcon.ShopOutlined style={{ color: '#1890ff' }} /> CÔNG TY GARA,
            CỨU HỘ
          </Breadcrumb>
          <div className={styles.create} style={{ height: '100%' }}>
            <Link to="/create-company">New Company</Link>
          </div>
        </Row>
        <Row>
          <Col
            style={{ marginRight: '10px' }}
            className={styles.filter_box}
            span={4}
          >
            <Search
              placeholder="Search"
              onSearch={value => console.log(value)}
              enterButton
              style={{ marginBottom: '10px' }}
            />
            <Select
              labelInValue
              style={{ width: 120 }}
              onChange={this.handleChange}
            >
              <Option value="all">All</Option>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Col>

          <Col className={styles.filter_box} span={19}>
            <Table columns={columns} dataSource={data} />
          </Col>
        </Row>
      </>
    );
  }
}
