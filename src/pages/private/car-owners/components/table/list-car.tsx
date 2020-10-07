import React from 'react';

import { Table } from 'antd';
import './index.less';

const columns: any = [
  {
    title: ' VIN',
    dataIndex: 'vin',
    key: 'vin',
  },
  {
    title: 'DEVICE MAC ADDRESS',
    dataIndex: 'mac',
    key: 'mac',
  },
  {
    title: 'BRAND',
    dataIndex: 'brand',
    key: 'brand',
  },
  {
    title: 'MODEL',
    dataIndex: 'model',
    key: 'model',
  },
  {
    title: 'RELEASE YEAR',
    dataIndex: 'release',
    key: 'release',
  },
];
const data: any = [];

class ListCar extends React.Component<any> {
  render() {
    return <Table columns={columns} dataSource={data} />;
  }
}

export default ListCar;
