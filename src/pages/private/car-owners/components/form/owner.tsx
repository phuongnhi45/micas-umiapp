import React from 'react';
import { Form, Input, Button, Breadcrumb } from 'antd';
import { connect, Loading, Dispatch, Link } from 'umi';
import { CustomerState } from '../../models/index';

import appIcon from '@/config/icons';

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
      const id = customer._id;
      console.log(values, 'value nè');
      dispatch({
        type: 'Customer/editCustomer',
        payload: { values, id },
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
    console.log(customer); //null->create, else ->update
    return (
      <>
        <Breadcrumb style={{ margin: '20px 20px 20px 0px' }}>
          <appIcon.ShopOutlined style={{ color: '#1890ff' }} />
          CUSTOMER/ {customer ? 'EDIT' : 'NEW'}
        </Breadcrumb>
        <Form {...layout} name="basic" onFinish={this.onFinish}>
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
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            initialValue={customer ? customer.password : ''}
            rules={[{ required: true }]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              {customer ? 'Update' : 'Create'}
            </Button>
          </Form.Item>
          <Button type="ghost">
            <Link to="/car-owners">Cancel</Link>
          </Button>
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
