import React from 'react';

import { Table } from 'antd';
import './index.less';
const columns = [
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
const data: any = [
  { vin: '1', mac: 'Qqq', brand: 'Vin', model: 'WWE', release: '2019' },
  { vin: '2', mac: 'Qqq', brand: 'Vi', model: 'WWEa', release: '2020' },
  { vin: '3', mac: 'Qqq', brand: 'Vin', model: 'WDWE', release: '2020' },
  { vin: '4', mac: 'Qqq', brand: 'Vin', model: 'WWEF', release: '2020' },
];

class ListCar extends React.Component<any> {
  render() {
    return <Table columns={columns} dataSource={data} />;
  }
}
export default ListCar;
