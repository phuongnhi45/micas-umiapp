import React from 'react';
import { connect, Loading, ConnectProps, Dispatch, Link } from 'umi';
import { CompanyState, CompanyModelState } from './model';

import Highlighter from 'react-highlight-words';
import {
  Row,
  Col,
  Input,
  Table,
  Breadcrumb,
  Tag,
  Space,
  Button,
  // DatePicker,
  Tooltip,
} from 'antd';

type IActiveFilterValue = 'active' | 'inactive';

import appIcon from '@/config/icons';
import styles from '../index.less';

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
  }

  onSelectChange = (selectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  start = () => {
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
      });
    }, 1000);
  };

  getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<appIcon.SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <appIcon.SearchOutlined
        style={{ color: filtered ? '#1890ff' : undefined }}
      />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text: any) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  onChangeStatus = (active: boolean, _id: string) => {
    this.props.dispatch({
      type: 'company/changeStatusCompany',
    });
    console.log(_id, active);
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
      },
      {
        title: 'Name',
        dataIndex: 'name',
        ...this.getColumnSearchProps('name'),
        render: (value: string) => {
          return <Link to="/booking">{value}</Link>;
        },
      },
      {
        title: 'Address',
        dataIndex: 'address',
        ...this.getColumnSearchProps('address'),
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
                color="#2E89EB"
              >
                active
              </Tag>
            );
          }
          return (
            <Tag
              onClick={() => this.onChangeStatus(active, row._id)}
              color="#2E89EB"
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
        dataIndex: 'action',
        render: () => (
          <Tooltip placement="top" title="Change logo">
            <appIcon.EditOutlined />
          </Tooltip>
        ),
      },
    ];

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
          <Col className={styles.filter_box} span={24}>
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
