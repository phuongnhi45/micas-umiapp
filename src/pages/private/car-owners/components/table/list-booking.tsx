import React from 'react';
import { Table } from 'antd';
import { IBooking } from 'umi';
import './index.less';
import Moment from 'react-moment';

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
        width: 200,
      },
      {
        title: 'Name service',
        dataIndex: 'servicename',
        width: 200,
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

    return <Table columns={columns} dataSource={bookings} rowKey="_id" />;
  }
}

export default ListBooking;
