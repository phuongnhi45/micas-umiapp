import React from 'react';
import { Table, Button, Checkbox } from 'antd';
import { EmployeeState } from 'umi';
import appIcon from '@/config/icons';

interface Props {
  onUpdate: (isVisible: boolean, data: any) => void;
  staffs: any;
  loading: boolean;
  onChangeStatus: any;
  onDelete: (_id: any) => void;
}

class TableList extends React.Component<Props> {
  state = {
    searchText: '',
    searchedColumn: '',
    active: false,
  };

  render() {
    const { active } = this.state;
    const { staffs, onUpdate, onDelete, loading, onChangeStatus } = this.props;
    const columns = [
      {
        key: '_id',
        title: '#',
        render: (value: any, record: EmployeeState, index: number) => index + 1,
        align: 'center',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        align: 'center',
      },
      {
        title: 'Active',
        dataIndex: '_id',
        align: 'center',
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
        align: 'center',
        render: (row: EmployeeState) => {
          return (
            <div>
              <Button
                icon={<appIcon.EditOutlined />}
                onClick={() => onUpdate(true, row)}
              />
              <Button
                icon={<appIcon.DeleteOutlined />}
                onClick={() => onDelete(row)}
              />
            </div>
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
