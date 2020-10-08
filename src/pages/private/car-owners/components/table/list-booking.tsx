import React from 'react';
import { Table, Tag } from 'antd';
import { IBooking, IService, Link } from 'umi';

import './index.less';
import moment from 'moment';

interface Props {
  bookings: IBooking[];
  loading: boolean;
}
interface PageService {
  services: IService[];
}

class ListBooking extends React.Component<Props, PageService> {
  render() {
    const { bookings, loading } = this.props;
    const columns: any = [
      {
        key: 'id',
        title: '#',
        render: (value: any, record: IBooking, index: number) => index + 1,
        align: 'center',
      },
      {
        title: 'Name service',
        dataIndex: 'service',
        render: (row: IService) => {
          return (
            <Link to={{ pathname: `/services/${row._id}` }}>{row.name}</Link>
          );
        },
      },
      {
        title: 'Status',
        dataIndex: 'status',
        align: 'center',
        render: (value: any) => <Tag color="blue">{value}</Tag>,
      },
      {
        title: 'Time',
        dataIndex: 'time',
        align: 'center',
        render: (value: string) => moment(value).format('DD/MM/YYYY, HH:mm'),
      },
      {
        title: 'CreatedAt',
        dataIndex: 'createdAt',
        align: 'center',
        render: (value: string) => moment(value).format('DD/MM/YYYY, HH:mm'),
      },
      {
        title: 'Note',
        dataIndex: 'note',
        align: 'center',
      },
    ];

    return (
      <Table
        loading={loading}
        columns={columns}
        dataSource={bookings}
        rowKey="_id"
      />
    );
  }
}

export default ListBooking;
