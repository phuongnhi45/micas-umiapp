import React from 'react';
import styles from '../index.less';
import { connect, Loading, ConnectProps, Dispatch } from 'umi';
import { CompanyState, CompanyModelState } from './model';

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
    render: (value: string, row: CompanyState) => {
      return <span>{value}</span>;
      // return <Link to="/booking">{row.name}</Link>
    },
  },
  {
    title: 'Email',
    dataIndex: 'email',
    render: (value: string, row: CompanyState) => {
      return <span>{value}</span>;
    },
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    render: (value: string, row: CompanyState) => {
      return <span>{value}</span>;
    },
  },
  {
    title: 'Address',
    dataIndex: 'address',
    render: (value: any) => <Tag color="blue">{value}</Tag>,
  },
  {
    title: 'Created at',
    dataIndex: 'date',
    // render: () => <DatePicker/>
  },
  {
    title: 'Active',
    dataIndex: 'active',
    render: (value: any, row: CompanyState) => <Checkbox />,
  },
  {
    render: () => (
      <Tooltip placement="top" title="Change logo">
        <appIcon.EditOutlined />
      </Tooltip>
    ),
  },
];

export interface PageProps extends ConnectProps {
  dispatch: Dispatch;
  loading: boolean;
  company: CompanyModelState;
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
    const { company } = this.props;
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
            <Table columns={columns} dataSource={company.companies} />
          </Col>
        </Row>
      </>
    );
  }
}

export default connect(
  ({ company, loading }: { company: CompanyModelState; loading: Loading }) => ({
    company,
    loading: loading.models.company,
  }),
)(ServicePlace);
