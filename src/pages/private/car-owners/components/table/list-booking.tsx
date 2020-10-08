import React from 'react';
import { Table, Tag } from 'antd';
import { IBooking, Link, IService } from 'umi';
import './index.less';
import Moment from 'react-moment';

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
        width: 200,
      },
      {
        title: 'Name service',
        dataIndex: 'service',
        width: 200,
        render: (row: IService) => {
          return <Link to="/service-places">{row.name}</Link>;
        },
      },
      {
        title: 'Status',
        dataIndex: 'status',
        align: 'center',
        width: 200,
      },
      {
        title: 'Time',
        dataIndex: 'time',
        align: 'center',
        width: 200,
        render: (record: string) => {
          return <Moment format=" h:mm:ss a">{record}</Moment>;
        },
      },
      {
        title: 'CreatedAt',
        dataIndex: 'createdAt',
        align: 'center',
        width: 200,
        render: (record: string) => {
          return <Moment format=" h:mm:ss a, DD/MM/YY">{record}</Moment>;
        },
      },

      {
        title: 'Note',
        dataIndex: 'note',
        align: 'center',
        width: 200,
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
