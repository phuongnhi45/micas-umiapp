import React from 'react';
import { connect, Loading, ConnectProps, Dispatch, Link } from 'umi';
import { CompanyState, CompanyModelState } from './model';
import EditCompany from './editCompany';

import Highlighter from 'react-highlight-words';
import { Row, Col, Input, Table, Breadcrumb, Tag, Space, Button } from 'antd';

import appIcon from '@/config/icons';
import styles from '../index.less';

type IActiveFilterValue = 'active' | 'inactive';

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
        ...this.getColumnSearchProps('name'),
        render: (value: string) => {
          return <Link to="/booking">{value}</Link>;
        },
      },
      {
        title: 'City',
        dataIndex: 'address',
        align: 'center',
        ...this.getColumnSearchProps('address'),
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
        render: (value: any) => {
          return <EditCompany onEdit={() => onEdit(value)} type="primary" />;
        },
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
            <Link to="/update-company">New Company</Link>
          </div>
        </Row>

        <Row>
          <Col className={styles.filter_box} span={24}>
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
