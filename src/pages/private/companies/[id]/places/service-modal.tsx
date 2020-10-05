import React from 'react';
import { Modal, Form, Input } from 'antd';

interface Props {
  visible: boolean;
  service: any;
  company: any;
  onSubmit: (data: any, service: any, company: any) => void;
  onCancel: (isVisible: boolean, data: any) => void;
}

const CollectionForm = ({ visible, onSubmit, onCancel, service, company }: Props) => {
  const [form] = Form.useForm();
  const cancelAndResetField = () => {
    form.resetFields();
    onCancel(false, null);
  };

  form.setFieldsValue(service ? service : {});
  return (
    <Modal
      visible={visible}
      title={service ? 'Edit service' : 'Create service'}
      okText={service ? 'Update' : 'Create'}
      cancelText="Cancel"
      onCancel={cancelAndResetField}
      onOk={() => {
        form
          .validateFields()
          .then(data => {
            form.resetFields();
            {
              service ? onSubmit(data, service, company) : onSubmit(data, service, company)
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
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: true,
              message: 'Please input the address of collection!',
            },
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
        >
          <Input/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

class ServiceModal extends React.Component<Props> {
  render() {
    const { visible, onSubmit, onCancel, service, company } = this.props;
    return (
      <div >
        <CollectionForm
          visible={visible}
          onSubmit={onSubmit}
          onCancel={onCancel}
          service={service}
          company={company}
        />
      </div>
    );
  }
}

export default ServiceModal;
