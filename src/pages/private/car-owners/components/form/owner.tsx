import React from 'react';
import { Form, Input, Button, Breadcrumb } from 'antd';
import { connect, Loading, Dispatch, Link } from 'umi';
import { CustomerState } from '../../models/index';

import './index.less';
import appIcon from '@/config/icons';
import styles from '../../../index.less';

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 3, span: 20 },
};

export interface CustomerProps {
  customer?: any;
  dispatch: Dispatch;
  loading: boolean;
}

class FormCustomer extends React.Component<CustomerProps, any> {
  onFinish = async (values: any) => {
    const { customer, dispatch } = this.props;
    if (customer) {
      const payload = Object.assign(values, {
        _id: customer._id,
        resourceid: customer.resourceid,
      });
      dispatch({
        type: 'Customer/editCustomer',
        payload: payload,
      });
    } else {
      dispatch({
        type: 'Customer/submitCustomer',
        payload: values,
      });
    }
  };

  render() {
    const { customer } = this.props;
    return (
      <>
        <Breadcrumb style={{ margin: '20px 0px' }}>
          <appIcon.ShopOutlined style={{ color: '#1890ff' }} /> CUSTOMER/{' '}
          {customer ? 'EDIT' : 'NEW'}
        </Breadcrumb>
        <Form
          {...layout}
          className={styles.company}
          name="basic"
          onFinish={this.onFinish}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true }]}
            initialValue={customer ? customer.name : ''}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            initialValue={customer ? customer.phone : ''}
            rules={[
              { required: true },
              { len: 10, message: 'Phone must be 10 characters.' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            initialValue={customer ? customer.address : ''}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            initialValue={customer ? customer.password : ''}
            rules={[
              { required: true },
              { min: 6, message: 'Password must be 6 characters.' },
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <div className="btn-choose">
              <Button type="ghost" style={{ color: '#1890ff' }}>
                <Link to="/car-owners">Cancel</Link>
              </Button>
              <Button type="primary" htmlType="submit">
                {customer ? 'Update' : 'Create'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </>
    );
  }
}

export default connect(
  ({ Customer, loading }: { Customer: CustomerState; loading: Loading }) => ({
    Customer,
    loading: loading.models.Customer,
  }),
)(FormCustomer);
