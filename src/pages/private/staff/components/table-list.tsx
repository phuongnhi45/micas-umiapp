import React from 'react';
import { Table, Input, Button, Space, Checkbox, Tag } from 'antd';
import Highlighter from 'react-highlight-words';
import appIcon from '@/config/icons';
import EditModal from './edit-modal';
import { EmployeeProps } from '..';
import { EmployeeState } from 'umi';

class TableList extends React.Component<any> {
  state = {
    searchText: '',
    searchedColumn: '',
    active: false,
  };

  render() {
    const { active } = this.state;
    const { Employee } = this.props;
    const onChangeStatus = (value: any, e: any) => {
      console.log(value);
      console.log(`checked = ${e.target.checked}`);
      if (!e.target.checked) {
      }
    };
    const onEdit = (value: any) => {
      return value;
    };
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '50%',
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        width: '40%',
      },
      {
        title: 'Active',
        dataIndex: '_id',
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
        render: (value: any, row: EmployeeState) => {
          return (
            <EditModal onEdit={() => onEdit(value)} type="primary"></EditModal>
          );
        },
      },
    ];

    return <Table columns={columns} dataSource={Employee} rowKey="_id" />;
  }
}

export default TableList;
