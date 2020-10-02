import React from 'react';
import { Table, Button, Checkbox, Popconfirm } from 'antd';
import { ICustomer, Link, history } from 'umi';
import appIcon from '@/config/icons';
interface Props {
  onUpdate: (isVisible: boolean, data: any) => void;
  onDelete: any;
  customers: ICustomer[];
  loading: boolean;
  onChangeStatus: (value: string, e: any) => void;
  onChange: (pagination: any, filters: any, sorter: any) => void;
  pageSize: number;
  total: number;
  current: number;
}

class ListBooking extends React.Component<Props> {
  state = {
    searchText: '',
    searchedColumn: '',
    active: false,
  };
  goToEdit = (customer: ICustomer) => {
    history.push(`/car-owners/${customer._id}/edit`);
  };

  render() {
    const { active } = this.state;
    const {
      customers,
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
        render: (value: any, record: ICustomer, index: number) => index + 1,
        align: 'center',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        render: (record: ICustomer, row: ICustomer) => {
          return (
            <div style={{ margin: 'auto', textAlign: 'center' }}>
              <Link to={{ pathname: `/car-owners/${row._id}` }}>{record}</Link>
            </div>
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
        title: 'Active',
        dataIndex: '_id',
        key: 'phone',
        align: 'center',
        render: (value: any, row: ICustomer) => {
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
        key: 'action',
        align: 'center',
        render: (row: ICustomer) => {
          return (
            <div style={{ margin: 'auto', textAlign: 'center' }}>
              <span style={{ paddingRight: '10px' }}>
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

export default ListBooking;
