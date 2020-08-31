import React from 'react';
import { Form, Input, Button, Checkbox, Row, Breadcrumb } from 'antd';

import styles from '../index.less';
import appIcon from '@/config/icons';

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default class App extends React.Component {
  onFinish = (values: any) => {
    console.log('Success:', values);
  };

  onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  render() {
    return (
      <>
        <Breadcrumb style={{ margin: '20px 20px 20px 0px' }}>
          <appIcon.ShopOutlined style={{ color: '#1890ff' }} /> CÔNG TY GARA,
          CỨU HỘ/ TẠO MỚI
        </Breadcrumb>
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          className={styles.company}
        >
          <Form.Item name="note" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="note" label="Location" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="note"
            label="Map address"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}
