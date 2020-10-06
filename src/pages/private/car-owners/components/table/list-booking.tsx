import React from 'react';
import { Table } from 'antd';
import { IBooking } from 'umi';
import './index.less';
import Moment from 'react-moment';

interface Props {
  bookings: IBooking[];
  loading: boolean;
  pageSize: number;
  total: number;
  current: number;
}

class ListBooking extends React.Component<Props> {
  state = {
    active: false,
  };

  render() {
    const { active } = this.state;
    const { bookings, loading, pageSize, total, current } = this.props;
    const columns: any = [
      {
        key: '_id',
        title: '#',
        render: (value: any, record: IBooking, index: number) => index + 1,
        align: 'center',
        width: 200,
      },
      {
        title: 'Name service',
        dataIndex: 'nameService',
        width: 200,
        render: (record: IBooking) => {
          return <p>{record}</p>;
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
        columns={columns}
        dataSource={bookings}
        rowKey="_id"
        size="large"
        loading={loading}
        pagination={{ pageSize, total, current: current + 1 }}
      />
    );
  }
}

export default ListBooking;
