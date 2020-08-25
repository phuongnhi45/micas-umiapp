import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

export default class Booking extends React.Component {
  render() {
    return (
      <Card style={{ width: 300, marginTop: 16 }}>
        <Meta title="Card title" description="This is the description" />
      </Card>
    );
  }
}
