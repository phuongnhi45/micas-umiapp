import React from 'react';
import { Modal, Form, Input } from 'antd';
import styles from '../../index.less';

interface Props {
  visible: boolean;
  staff: any;
  onSubmit: (data: any, staff: any) => void;
  onCancel: (isVisible: boolean, data: any) => void;
}

const CollectionForm = ({ visible, onSubmit, onCancel, staff }: Props) => {
  const [form] = Form.useForm();
  const cancelAndResetField = () => {
    form.resetFields();
    onCancel(false, null);
  };

  form.setFieldsValue(staff ? staff : {});
  return (
    <Modal
      visible={visible}
      title={staff ? 'Edit employee' : 'Create employee'}
      okText={staff ? 'Update' : 'Create'}
      cancelText="Cancel"
      onCancel={cancelAndResetField}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            {
              staff ? onSubmit(values, staff) : onSubmit(values, staff);
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

class ModalForm extends React.Component<Props> {
  render() {
    const { visible, onSubmit, onCancel, staff } = this.props;
    return (
      <div className={styles.staff}>
        <CollectionForm
          visible={visible}
          onSubmit={onSubmit}
          onCancel={onCancel}
          staff={staff}
        />
      </div>
    );
  }
}

export default ModalForm;
