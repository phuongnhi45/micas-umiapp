import React from 'react';
import { Table, Button, Checkbox } from 'antd';
import { EmployeeState, Loading } from 'umi';
import { EditOutlined } from '@ant-design/icons';

interface Props {
  onUpdate: (isVisible: boolean, data: any) => void;
  staffs: any;
  loading: boolean;
}

class TableList extends React.Component<Props> {
  state = {
    searchText: '',
    searchedColumn: '',
    active: false,
  };

  render() {
    const { active } = this.state;
    const { staffs, onUpdate, loading } = this.props;
    const onChangeStatus = (value: any, e: any) => {
      console.log(value);
      console.log(`checked = ${e.target.checked}`);
      if (!e.target.checked) {
      }
    };
    const columns = [
      {
        key: '_id',
        title: '#',
        render: (value: any, record: EmployeeState, index: number) => index + 1,
        algin: 'center',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        algin: 'center',
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        algin: 'center',
      },
      {
        title: 'Active',
        dataIndex: '_id',
        algin: 'center',
        render: (value: any, row: EmployeeState) => {
          if (row.active) {
            return (
              <Checkbox
                checked={!active}
                onChange={e => onChangeStatus(value, e)}
              />
            );
          } else {
            return (
              <Checkbox
                checked={active}
                onChange={e => onChangeStatus(value, e)}
              />
            );
          }
        },
      },
      {
        title: '',
        algin: 'center',
        render: (value: any, row: EmployeeState) => {
          return (
            <Button
              icon={<EditOutlined />}
              onClick={() => onUpdate(true, row)}
            />
          );
        },
      },
    ];

    return (
      <div style={{ color: 'red' }}>
        <Table
          columns={columns}
          dataSource={staffs}
          rowKey="_id"
          size="small"
          loading={loading}
        />
      </div>
    );
  }
}

export default TableList;
