import React from 'react';
import { Form, Input, Button, Breadcrumb } from 'antd';
import { connect, Loading, ConnectProps, Dispatch, Link } from 'umi';

import { CompanyState } from './model';

import styles from '../index.less';
import appIcon from '@/config/icons';

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 3, span: 20 },
};

export interface CompanyProps extends ConnectProps {
  company: CompanyState;
  dispatch: Dispatch;
  loading: boolean;
}

class newCompany extends React.Component<CompanyProps, any> {
  onFinish = async (value: any) => {
    this.props.dispatch({
      type: 'company/createCompany',
      payload: value,
    });
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
          className={styles.company}
        >
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="note" label="Location">
            <Input placeholder="Search.." />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.2771920086598!2d107.5865213149806!3d16.46149613317805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3141a138544240a5%3A0x882ddf04d7146c9f!2zOSBOZ8O0IFF1eeG7gW4sIFbEqW5oIE5pbmgsIFRow6BuaCBwaOG7kSBIdeG6vywgVGjhu6thIFRoacOqbiBIdeG6vywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1585213273943!5m2!1svi!2s"
              width={'100%'}
              height={400}
              frameBorder={0}
              style={{ border: 0 }}
              allowFullScreen
              aria-hidden="false"
              tabIndex={0}
            />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>

          <Button className={styles.cancel} type="ghost">
            <Link to="/service-places">Cancel</Link>
          </Button>
        </Form>
      </>
    );
  }
}

export default connect(
  ({ company, loading }: { company: CompanyState; loading: Loading }) => ({
    company,
    loading: loading.models.company,
  }),
)(newCompany);
