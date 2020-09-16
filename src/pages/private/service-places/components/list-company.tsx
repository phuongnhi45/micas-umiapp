import React from 'react';
import { Table, Tag, Button } from 'antd';
import { Link, CompanyState } from 'umi';
import * as moment from 'moment';

import appIcon from '@/config/icons';
import styles from '../../index.less';

interface Props {
  onUpdate: (id: string) => void;
  onChangeStatus: (active: boolean, _id: string) => void;
  companies: any;
  loading: boolean;
  onDelete: (_id: any) => void;
}

type IActiveFilterValue = 'active' | 'inactive';

class ListCompanies extends React.Component<Props> {
  state = {
    active: false,
    searchText: '',
  };

  render() {
    const {
      companies,
      onDelete,
      loading,
      onUpdate,
      onChangeStatus,
    } = this.props;
    const columns = [
      {
        title: '#',
        align: 'center',
        render: (value: any, record: CompanyState, index: number) => index + 1,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        render: (value: string) => {
          return <Link to="/booking">{value}</Link>;
        },
      },
      {
        title: 'City',
        dataIndex: 'address',
        align: 'center',
        render: (value: any) => <Tag color="blue">{value}</Tag>,
      },
      {
        title: 'Created at',
        align: 'center',
        render: (value: string) => {
          return moment(value).format('DD/MM/YYYY, HH:mm');
        },
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
        render: (active: boolean, row: CompanyState) => {
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
        onFilter: (filterValue: IActiveFilterValue, record: CompanyState) =>
          record.active === (filterValue === 'active' ? true : false),
      },
      {
        title: 'Action',
        align: 'center',
        render: (row: CompanyState) => {
          return (
            <div className={styles.action}>
              <Button
                icon={<appIcon.EditOutlined />}
                onClick={() => onUpdate(row._id)}
              />
              <Button
                icon={<appIcon.DeleteOutlined />}
                onClick={() => onDelete(row._id)}
              />
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
      />
    );
  }
}

export default ListCompanies;
