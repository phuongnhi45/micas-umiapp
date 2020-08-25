import React from 'react';
import styles from '../index.less';
import { Row, Col, Input, Select, Table } from 'antd';

const { Search } = Input;
const children: string[] = ['Tất cả', 'Hoạt động', 'Không hoạt động'];
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    // render: text => <Link to="/booking">{text}</Link>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
const data: Item[] = [];

for (let i = 0; i < 5; i++) {
  data.push({
    key: i.toString(),
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

interface Item {
  key: string;
  name: string;
  age: number;
  address: string;
}

export default class ServicePlace extends React.Component {
  handleChange(value: any) {
    console.log(`Selected: ${value}`);
  }

  render() {
    return (
      <Row>
        <Col
          style={{ marginRight: '10px' }}
          className={styles.filter_box}
          span={4}
        >
          <Search
            placeholder="Tất cả"
            onSearch={value => console.log(value)}
            enterButton
          />
          <Select
            size="large"
            defaultValue="Tất cả"
            onChange={this.handleChange}
            style={{ width: '100%' }}
          >
            {children}
          </Select>
        </Col>
        <Col className={styles.filter_box} span={7}>
          <Table columns={columns} dataSource={data} />
        </Col>
      </Row>
    );
  }
}
