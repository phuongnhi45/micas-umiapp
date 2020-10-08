import React from 'react';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import { Table, Button, Popconfirm, Tag } from 'antd';
import { ICustomer, Link, history } from 'umi';
import appIcon from '@/config/icons';
import './index.less';

interface Props {
  onUpdate: (isVisible: boolean, data: any) => void;
  onDelete: any;
  customers: ICustomer[];
  loading: boolean;
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
  goToEdit = (customer: ICustomer) => {
    history.push(`/customers/${customer._id}/edit`);
  };

  render() {
    const {
      customers,
      onDelete,
      loading,
      onChange,
      pageSize,
      total,
      current,
    } = this.props;

    const columns: any = [
      {
        key: '_id',
        title: '#',
        render: (value: any, record: ICustomer, index: number) => index + 1,
        align: 'center',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (record: ICustomer, row: ICustomer) => {
          return (
            <Link to={{ pathname: `/customers/${row._id}` }}>{record}</Link>
          );
        },
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        align: 'center',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        align: 'center',

        render: (record: ICustomer) => {
          return (
            <Tag color="blue" style={{ width: '100px' }}>
              <Ellipsis length={10} tooltip>
                {record}
              </Ellipsis>
            </Tag>
          );
        },
      },
      {
        title: 'Action',
        key: 'action',
        align: 'center',
        render: (row: ICustomer) => {
          return (
            <div style={{ margin: 'auto', textAlign: 'center' }}>
              <span style={{ paddingRight: '5px' }}>
                <Button
                  icon={<appIcon.EditOutlined />}
                  onClick={() => this.goToEdit(row)}
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
        dataSource={customers}
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
