import React from 'react';
import styles from '../index.less';
import { connect, Loading, ConnectProps, Dispatch } from 'umi';
import { NewCompany } from './model';

import {
  Row,
  Col,
  Input,
  Select,
  Table,
  Breadcrumb,
  Tag,
  Checkbox,
  // DatePicker,
  Tooltip,
} from 'antd';

import appIcon from '@/config/icons';
import { Link } from 'umi';
import Item from 'antd/lib/list/Item';

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
    title: 'Address',
    dataIndex: 'address',
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
    render: (value: any, row: NewCompany) => {
      // if (row.active) {
      //   return <p>Hoạt động</p>;
      // }
      // return <Checkbox/>;
      console.log('row', row);
    },
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
    address: '',
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
  date: string;
}

export interface PageProps extends ConnectProps {
  Company: NewCompany;
  dispatch: Dispatch;
  loading: boolean;
}

class ServicePlace extends React.Component<PageProps, any> {
  handleChange(value: any) {
    console.log(`Selected: ${value}`);
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'company/getCompanies',
    });
  }

  render() {
    const { Company } = this.props;
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
              placeholder="Select an option"
              style={{ width: '100%' }}
              onChange={this.handleChange}
            >
              <Option value="all">All</Option>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Col>

          <Col className={styles.filter_box} span={19}>
            <Table columns={columns} dataSource={Item} />
          </Col>
        </Row>
      </>
    );
  }
}

export default connect(
  ({ Company, loading }: { Company: NewCompany; loading: Loading }) => ({
    Company,
    loading: loading.models.company,
  }),
)(ServicePlace);
