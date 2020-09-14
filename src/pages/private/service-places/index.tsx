import React from 'react';
import { connect, Loading, ConnectProps, Dispatch, Link } from 'umi';
import { CompanyState, CompanyModelState } from './model';

import Highlighter from 'react-highlight-words';
import { Row, Col, Input, Table, Breadcrumb, Tag, Space, Button } from 'antd';

import appIcon from '@/config/icons';
import styles from '../index.less';

type IActiveFilterValue = 'active' | 'inactive';

const { Search } = Input;

export interface PageProps extends ConnectProps {
  dispatch: Dispatch;
  loading: boolean;
  company: CompanyModelState;
}

class ServicePlace extends React.Component<PageProps, any> {
  state = {
    searchText: '',
    searchedColumn: '',
    selectedRowKeys: [],
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'company/getCompanies',
    });
    console.log('fetch data');
  }

  onSelectChange = (selectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  onChangeStatus = (active: boolean, _id: string) => {
    this.props.dispatch({
      type: 'company/changeStatusCompany',
      payload: { active, _id },
    });
  };

  handleReset = (clearFilters: any) => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    const { company } = this.props;
    const columns = [
      {
        title: '#',
        dataIndex: 'index',
        align: 'center',
        render: (index: number) => index + 1,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        render: (value: string) => {
          return <Link to="/booking">{value}</Link>;
        },
      },
      {
        title: 'City',
        dataIndex: 'address',
        align: 'center',
        render: (value: any) => <Tag color="blue">{value}</Tag>,
      },
      {
        title: 'Created at',
        dataIndex: 'date',
        align: 'center',
        width: '20%',
        render: () => Date(),
      },
      {
        title: 'Active',
        dataIndex: 'active',
        align: 'center',
        filters: [
          {
            text: 'Active',
            value: 'active' as IActiveFilterValue,
          },
          {
            text: 'Inactive',
            value: 'inactive' as IActiveFilterValue,
          },
        ],
        render: (active: boolean, row: CompanyState) => {
          if (row.active) {
            return (
              <Tag
                onClick={() => this.onChangeStatus(active, row._id)}
                color="geekblue"
              >
                Active
              </Tag>
            );
          }
          return (
            <Tag
              onClick={() => this.onChangeStatus(active, row._id)}
              color="green"
            >
              Inactive
            </Tag>
          );
        },
        filterMultiple: false,
        onFilter: (filterValue: IActiveFilterValue, record: CompanyState) =>
          record.active === (filterValue === 'active' ? true : false),
      },
      {
        title: 'Action',
        dataIndex: '_id',
        align: 'center',
        render: (value: any) => {},
      },
    ];

    const onEdit = (value: any) => {
      console.log('index', value);
      return value;
    };

    return (
      <>
        <Row className={styles.row}>
          <Breadcrumb className={styles.breadcrumb}>
            <appIcon.ShopOutlined style={{ color: '#1890ff' }} /> CÔNG TY GARA,
            CỨU HỘ
          </Breadcrumb>
          <div className={styles.create} style={{ height: '100%' }}>
            {/* button create  */}
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
              onSearch={(value: any) => console.log(value)}
              enterButton
              style={{ marginBottom: '10px' }}
            />
          </Col>

          <Col className={styles.filter_box} span={19}>
            <Table columns={columns} bordered dataSource={company.companies} />
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
