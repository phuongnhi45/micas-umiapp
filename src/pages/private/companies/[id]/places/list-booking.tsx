import React from 'react';
import { Table, Tag, Button, Popconfirm } from 'antd';
import { IBooking, IService } from 'umi';
import moment from 'moment';

import appIcon from '@/config/icons';
import styles from '../../../index.less'

interface Props {
  loading: boolean;
  bookings: any;
  services: IService[]
  onDelete: (_id: string) => void;
}

class ListBooking extends React.Component<Props> {
  render() {
    const { bookings, loading, onDelete } = this.props
    const columns: any = [
      {
        title: '#',
        align: 'center',
        render: (value: any, record: IBooking, index: number) => index + 1,
      },
      {
        title: 'Phone',
        dataIndex: 'customer',
        render: (row: IService) => {
          return <p>{row.phone}</p>;
        },
      },
      {
        title: 'Created Date',
        align: 'center',
        dataIndex: 'createdAt',
        render: (value: string) => moment(value).format('DD/MM/YYYY, HH:mm') 
      },
      {
        title: 'Status',
        dataIndex: 'status',
        align: 'center',
        render: (value: any) => <Tag color="blue">{value}</Tag>,
      },
      {
        title: 'Time',
        align: 'center',
        dataIndex: 'time',
        render: (value: string) => moment(value).format('DD/MM/YYYY, HH:mm') 
      },
      {
        title: 'Note',
        dataIndex: 'note',
        key: 'note',
      },
      {
        title: 'Action',
        align: 'center',
        dataIndex: '_id',
        render: (value: any) => {
          return (
            <div className={styles.action}>
              <Popconfirm
                title="Are you sure？"
                okText="Yes"
                cancelText="No"
                onConfirm={() => onDelete(value)}
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
        dataSource={bookings}
        rowKey="_id"
        loading={loading}
      />
    );
  }
}

export default ListBooking;
