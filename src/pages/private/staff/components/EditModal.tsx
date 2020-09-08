import React from 'react';
import { Modal, Form, Input, Tooltip } from 'antd';
import { connect, Loading, ConnectProps, Dispatch } from 'umi';
import { EmployeeState } from '../model';

import appIcon from '@/config/icons';

const CollectionCreateForm = ({ visible, onCreate, onCancel }: any) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Edit information employee"
      okText="Submit"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="name"
          label=" Name"
          rules={[
            {
              required: true,
              message: 'Please input the name of collection!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            {
              required: true,
              message: 'Please input the phone of collection!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input the password of collection!',
            },
          ]}
        >
          <Input type="password" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export interface EmployeeProps extends ConnectProps {
  Employee: EmployeeState;
  dispatch: Dispatch;
  loading: boolean;
}

class EditModal extends React.Component<EmployeeProps, any> {
  state = {
    show: false,
  };

  onCreate = (values: any) => {
    const { onEdit } = this.props;
    const id = onEdit();
    this.setState({ show: false });
    this.props.dispatch({
      type: 'Employee/editEmployee',
      payload: { values, id },
    });
  };

  render() {
    const { show } = this.state;
    return (
      <div>
        <Tooltip placement="top" title="edit">
          <appIcon.EditOutlined
            onClick={() => {
              this.setState({ show: true });
            }}
          />
        </Tooltip>
        <CollectionCreateForm
          visible={show}
          onCreate={this.onCreate}
          onCancel={() => {
            this.setState({ show: false });
          }}
        />
      </div>
    );
  }
}

export default connect(
  ({ Employee, loading }: { Employee: EmployeeState; loading: Loading }) => ({
    Employee,
    loading: loading.models.Employee,
  }),
)(EditModal);
