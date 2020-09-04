import React from 'react';
import styles from '../index.less';
import { connect, Loading, ConnectProps, Dispatch } from 'umi';
import { CompanyState } from './model';

import {
  Row,
  Col,
  Input,
  Table,
  Breadcrumb,
  Tag,
  Button,
  Space,
  // DatePicker,
  Checkbox,
  Tooltip,
} from 'antd';
import highlightWords from 'highlight-words';

import appIcon from '@/config/icons';
import { Link } from 'umi';
const { Search } = Input;

export interface PageProps extends ConnectProps {
  Company: CompanyState;
  dispatch: Dispatch;
  loading: boolean;
}

class ServicePlace extends React.Component<PageProps, any> {
  state = {
    searchText: '',
    searchedColumn: '',
    selectedRowKeys: [],
  };

  handleChange(value: any) {
    console.log(`Selected: ${value}`);
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'company/getCompanies',
    });
  }

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
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

    filterIcon: filtered => (
      <appIcon.SearchOutlined
        style={{ color: filtered ? '#1890ff' : undefined }}
      />
    ),

    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '',

    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },

    render: text =>
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

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    const { Company } = this.props;
    const { selectedRowKeys } = this.state;
    const columns = [
      {
        title: '#',
        dataIndex: 'index',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        ...this.getColumnSearchProps('phone'),
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
        render: (value: any, row: CompanyState) => {
          if (row.active) {
            return <p>Hoạt động</p>;
          }
          return <Checkbox />;
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

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        {
          key: 'odd',
          text: 'Select Odd Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
        {
          key: 'even',
          text: 'Select Even Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
      ],
    };

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
            {/* <Select
              labelInValue
              placeholder="Select an option"
              style={{ width: '100%' }}
              onChange={this.handleChange}
            >
              <Option value="all">All</Option>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select> */}
          </Col>

          <Col className={styles.filter_box} span={19}>
            <Table
              rowSelection={rowSelection}
              rowKey="_id"
              columns={columns}
              dataSource={Company}
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default connect(
  ({ Company, loading }: { Company: CompanyState; loading: Loading }) => ({
    Company,
    loading: loading.models.company,
  }),
)(ServicePlace);
