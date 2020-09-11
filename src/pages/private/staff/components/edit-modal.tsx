import React from 'react';
import { Button, Modal, Form, Input } from 'antd';
import styles from '../../index.less';

const CollectionCreateForm = ({ visible, onCreate, onCancel }: any) => {
  const [form] = Form.useForm();
  const staff = '';
  return (
    <Modal
      visible={visible}
      title={staff ? 'Edit employee' : 'Create employee'}
      okText="Create"
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

class ModalForm extends React.Component<any> {
  render() {
    const { show, onCreate, onShow } = this.props;
    return (
      <div className={styles.staff}>
        <Button type="primary" onClick={onShow}>
          New Staff
        </Button>
        <CollectionCreateForm
          visible={show}
          onCreate={onCreate}
          onCancel={() => {
            return show;
          }}
        />
      </div>
    );
  }
}

export default ModalForm;
