import React from 'react';
import { Table, Button, Checkbox } from 'antd';
import { IEmployee } from 'umi';
import appIcon from '@/config/icons';

interface Props {
  onUpdate: (isVisible: boolean, data: any) => void;
  onDelete: any;
  employees: IEmployee[];
  loading: boolean;
  onChangeStatus: (value: string, e: any) => void;
  onChange: (pagination: any, filters: any, sorter: any) => void;
  pageSize: number;
  total: number;
  current: number;
}

class TableList extends React.Component<Props> {
  state = {
    searchText: '',
    searchedColumn: '',
    active: false,
  };

  render() {
    const { active } = this.state;
    const {
      employees,
      onUpdate,
      onDelete,
      loading,
      onChange,
      pageSize,
      total,
      current,
      onChangeStatus,
    } = this.props;

    const columns = [
      {
        key: '_id',
        title: '#',
        render: (value: any, record: IEmployee, index: number) => index + 1,
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
        render: (value: any, row: IEmployee) => {
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
        render: (value: any, row: IEmployee) => {
          return (
            <>
              <Button
                icon={<appIcon.EditOutlined />}
                onClick={() => onUpdate(true, row)}
              />
              <Button
                icon={<appIcon.DeleteOutlined />}
                onClick={() => onDelete(row)}
              />
            </>
          );
        },
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={employees}
        bordered
        rowKey="_id"
        size="large"
        loading={loading}
        onChange={onChange}
        pagination={{ pageSize, total, current: current + 1 }}
      />
    );
  }
}

export default TableList;
