import React from 'react';
import { Table } from 'antd';
import { IBooking } from 'umi';
import moment from 'moment';

import './index.less';

interface Props {
  bookings: IBooking[];
  loading: boolean;
}

class ListBooking extends React.Component<Props> {
  state = {
    active: false,
  };

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
        render: (row: IBooking) => {
          return <b>{row.name}</b>;
        },
      },
      {
        title: 'Status',
        dataIndex: 'status',
        align: 'center',
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
