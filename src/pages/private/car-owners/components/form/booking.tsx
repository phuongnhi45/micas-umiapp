import React from 'react';
import { Modal, Form, Input } from 'antd';

interface Props {
  visible: boolean;
  onSubmit: (data: any) => void;
  onCancel: (isVisible: boolean, data: any) => void;
}

const CollectionForm = ({ visible, onSubmit, onCancel }: Props) => {
  const [form] = Form.useForm();
  const cancelAndResetField = () => {
    form.resetFields();
    onCancel(false, null);
  };
  form.setFieldsValue({});
  return (
    <Modal
      visible={visible}
      title={'Create booking'}
      okText={'Create'}
      cancelText="Cancel"
      onCancel={cancelAndResetField}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            {
              onSubmit(values);
            }
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
          label="Name"
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
            { len: 10, message: 'Phone must be 10 characters.' },
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
            { len: 6, message: 'Password must be 6 characters.' },
          ]}
        >
          <Input type="password" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

class ModalForm extends React.Component<Props> {
  render() {
    const { visible, onSubmit, onCancel } = this.props;
    return (
      <div>
        <CollectionForm
          visible={visible}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </div>
    );
  }
}

export default ModalForm;
