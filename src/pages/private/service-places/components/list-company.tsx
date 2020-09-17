import React from 'react';
import { Table, Tag, Button, Popconfirm } from 'antd';
import { Link, CompanyState } from 'umi';
import * as moment from 'moment';

import appIcon from '@/config/icons';
import styles from '../../index.less';

interface Props {
  onUpdate: (_id: string) => void;
  onChangeStatus: (active: boolean, _id: string) => void;
  companies: any;
  loading: boolean;
  onDelete: (_id: string) => void;
}

class ListCompanies extends React.Component<Props> {
  state = {
    searchText: '',
    active: false,
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
        // filters: [
        //   {
        //     text: 'Active',
        //     value: 'Active' as IActiveFilterValue,
        //   },
        //   {
        //     text: 'Inactive',
        //     value: 'Inactive' as IActiveFilterValue,
        //   },
        // ],
        render: (active: any, row: CompanyState) => {
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
        pagination={{
          current: 1,
          defaultCurrent: 1,
          defaultPageSize: 8,
          pageSize: 8,
          total: 14,
        }}
      />
    );
  }
}

export default ListCompanies;
