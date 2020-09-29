import React from 'react';
import { Table, Tag, Button, Popconfirm } from 'antd';
import { ICompany, history } from 'umi';

import appIcon from '@/config/icons';
import styles from '../../index.less';

interface Props {
  onChangeStatus: (active: boolean, _id: string) => void;
  companies: ICompany[];
  loading: boolean;
  onDelete: (_id: string) => void;
  onChange: (pagination: any, filters: any, sorter: any) => void;
  pageSize: number;
  total: number;
  current: number;
}

type IActiveFilterValue = 'active' | 'inactive';

class ListCompanies extends React.Component<Props> {
  state = {
    active: false,
  };

  goToEdit = (company: ICompany) => {
    history.push(`/service-places/${company._id}/edit`);
  };

  goToDetailCompany = (company: ICompany) => {
    history.push(`/detail-company/${company._id}`);
  };

  render() {
    const {
      companies,
      loading,
      onChangeStatus,
      onChange,
      pageSize,
      onDelete,
      total,
      current,
    } = this.props;
    const columns: any = [
      {
        title: '#',
        align: 'center',
        render: (value: any, record: ICompany, index: number) => index + 1,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        render: (value: string, row: ICompany) => {
          return (
            <button
              className={styles.name_company}
              onClick={() => this.goToDetailCompany(row)}
            >
              {value}
            </button>
          );
        },
      },
      {
        title: 'Email',
        dataIndex: 'email',
        align: 'center',
        key: 'email',
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        align: 'center',
        key: 'phone',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        align: 'center',
        render: (value: any) => <Tag color="blue">{value}</Tag>,
      },
      {
        title: 'Active',
        dataIndex: 'active',
        align: 'center',
        filters: [
          {
            text: 'Active',
            value: 'active' as IActiveFilterValue,
          },
          {
            text: 'Inactive',
            value: 'inactive' as IActiveFilterValue,
          },
        ],
        render: (active: boolean, row: ICompany) => {
          if (row.active) {
            return (
              <Tag
                onClick={() => onChangeStatus(active, row._id)}
                color="geekblue"
              >
                Active
              </Tag>
            );
          }
          return (
            <Tag onClick={() => onChangeStatus(active, row._id)} color="green">
              Inactive
            </Tag>
          );
        },
        filterMultiple: false,
        onFilter: (filterValue: IActiveFilterValue, record: ICompany) =>
          record.active === (filterValue === 'active' ? true : false),
      },
      {
        title: 'Action',
        align: 'center',
        render: (row: ICompany) => {
          return (
            <div className={styles.action}>
              <Button
                icon={<appIcon.EditOutlined />}
                onClick={() => this.goToEdit(row)}
              />
              <Popconfirm
                title="Are you sure？"
                okText="Yes"
                cancelText="No"
                onConfirm={() => onDelete(row._id)}
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
        dataSource={companies}
        rowKey="_id"
        size="large"
        loading={loading}
        onChange={onChange}
        pagination={{ pageSize, total, current: current + 1 }}
      />
    );
  }
}

export default ListCompanies;
