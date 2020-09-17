import React from 'react';
import { Table, Tag, Button } from 'antd';
import { Link, ICompany, history } from 'umi';
import appIcon from '@/config/icons';
import format from '@/utils/format';

interface Props {
  onChangeStatus: (active: boolean, _id: string) => void;
  companies: ICompany[];
  loading: boolean;
  onChange: (pagination: any, filters: any, sorter: any) => void;
  pageSize: number;
  total: number;
  current: number;
}

type IActiveFilterValue = 'active' | 'inactive';

class ListCompanies extends React.Component<Props> {
  state = {
    active: false,
    searchText: '',
  };

  goToEdit = (company: ICompany) => {
    history.push(`/service-places/${company._id}/edit`);
  };

  render() {
    const {
      companies,
      loading,
      onChangeStatus,
      onChange,
      pageSize,
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
        render: (value: string) => {
          return <Link to="">{value}</Link>;
        },
      },
      {
        title: 'City',
        dataIndex: 'address',
        align: 'center',
        render: (value: any) => <Tag color="blue">{value}</Tag>,
      },
      {
        title: 'Created Date',
        align: 'center',
        dataIndex: 'createdAt',
        render: (value: string) => format.date(new Date().toISOString()), // TODO: APi chưa có ngày tạo ...
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
            <Button
              icon={<appIcon.EditOutlined />}
              onClick={() => this.goToEdit(row)}
            />
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
