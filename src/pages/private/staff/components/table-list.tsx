import React from 'react';
import { Table, Button, Checkbox } from 'antd';
import { EmployeeState } from 'umi';
import appIcon from '@/config/icons';

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
        title: 'Action',
        render: (value: any, row: EmployeeState) => {
          return (
            <Button
              icon={<appIcon.EditOutlined />}
              onClick={() => onUpdate(true, row)}
            />
          );
        },
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={staffs}
        bordered
        rowKey="_id"
        size="large"
        loading={loading}
      />
    );
  }
}

export default TableList;
