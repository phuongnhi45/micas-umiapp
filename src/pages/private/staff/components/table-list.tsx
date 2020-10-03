import React from 'react';
import { Table, Button, Checkbox, Popconfirm } from 'antd';
import { IEmployee, Link } from 'umi';
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

    const columns: any = [
      {
        key: '_id',
        title: '#',
        render: (value: any, record: IEmployee, index: number) => index + 1,
        align: 'center',
        width: 200,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 200,
        render: (record: IEmployee) => {
          return <Link to="">{record}</Link>;
        },
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        align: 'center',
        width: 200,
      },
      {
        title: 'Active',
        dataIndex: '_id',
        align: 'center',
        width: 150,
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
        dataIndex: '_id',
        key: '_id',
        align: 'center',
        width: 200,
        render: (value: any, row: IEmployee) => {
          return (
            <div style={{ margin: 'auto', textAlign: 'center' }}>
              <span style={{ paddingRight: '5px' }}>
                <Button
                  icon={<appIcon.EditOutlined />}
                  onClick={() => onUpdate(true, row)}
                />
              </span>
              <Popconfirm
                title="Are you sure？"
                okText="Yes"
                cancelText="No"
                onConfirm={() => onDelete(row)}
              >
                <Button icon={<appIcon.DeleteOutlined />} />
              </Popconfirm>
            </div>
          );
        },
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={employees}
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
