import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Table, Tag, Checkbox } from 'antd';
import { connect, Loading, ConnectProps, Dispatch } from 'umi';
import { EmployeeState } from '../model';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Phone number',
    dataIndex: 'phone',
  },
  {
    title: 'Active',
    dataIndex: 'active',
    render: (value: any, row: EmployeeState) => {
      if (row.active) {
        return <p>Hoạt động</p>;
      }
      return <p>Không hoạt động</p>;
    },
  },
];
export interface PageProps extends ConnectProps {
  Employee: EmployeeState;
  dispatch: Dispatch;
  loading: boolean;
}
class TableList extends React.Component<PageProps, any> {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
  };
  componentDidMount() {
    this.props.dispatch({
      type: 'Employee/getEmployees',
    });
  }

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys); //cần lấy cái này ra cái nào đang hoạt động,
    // lấy ra các id đó thì mình cho setstate hoạt động
    console.log(typeof selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    const { Employee } = this.props;
    const { selectedRowKeys } = this.state;
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
      <Table
        rowSelection={rowSelection}
        columns={columns}
        rowKey="_id"
        dataSource={Employee}
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
