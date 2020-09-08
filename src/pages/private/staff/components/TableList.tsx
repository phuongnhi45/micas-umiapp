import React from 'react';
import { Table, Input, Button, Space, Checkbox } from 'antd';
import Highlighter from 'react-highlight-words';
import appIcon from '@/config/icons';
import { connect, Loading, ConnectProps, Dispatch } from 'umi';
import { EmployeeState } from '../model';
import EditModal from './EditModal';

export interface PageProps extends ConnectProps {
  Employee: EmployeeState;
  dispatch: Dispatch;
  loading: boolean;
}

class TableList extends React.Component<PageProps, any> {
  state = {
    searchText: '',
    searchedColumn: '',
    selectedRowKeys: [],
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'Employee/getEmployees',
    });
  }
  // onSelectChange = (selectedRowKeys: any) => {
  //   console.log(selectedRowKeys,'select row key nè')
  //   this.setState({ selectedRowKeys });
  // };
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

  handleReset = (clearFilters: any) => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    const { Employee } = this.props;
    const { selectedRowKeys } = this.state;
    const onChangeStatus = (value: any, e: any) => {
      console.log(value);
      console.log(`checked = ${e.target.checked}`);
      if (!e.target.checked) {
      }
      this.props.dispatch({
        type: 'Employee/updateStatus',
        payload: value,
      });
    };
    const onEdit = value => {
      console.log('id nè huhu ');
      console.log(value);
      return value;
    };
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '50%',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        width: '40%',
        ...this.getColumnSearchProps('phone'),
      },
      {
        title: 'Active',
        dataIndex: '_id',
        render: (value: any) => {
          return <Checkbox onChange={e => onChangeStatus(value, e)} />;
        },
      },
      {
        title: '',
        dataIndex: '_id',
        render: (value: any) => {
          return (
            <EditModal onEdit={() => onEdit(value)} type="primary"></EditModal>
          );
        },
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
          onSelect: (changableRowKeys: any) => {
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
          onSelect: (changableRowKeys: any) => {
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
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={Employee}
        rowKey="_id"
      />
    );
  }
}

export default connect(
  ({ Employee, loading }: { Employee: EmployeeState; loading: Loading }) => ({
    Employee,
    loading: loading.models.Employee,
  }),
)(TableList);
//nếu có active thì cho màu xanh,đó là lúc đổ ra, nếu không thì cho màu trắng
