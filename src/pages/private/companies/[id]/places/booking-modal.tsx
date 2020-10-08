import React from 'react';
import { Modal, Form, Input, DatePicker, TimePicker, Space } from 'antd';

interface Props {
  visible: boolean;
  onSubmit: (data: any) => void;
  onCancel: (isVisible: boolean, data: any) => void;
}

const CollectionForm = ({ visible, onSubmit, onCancel }: Props) => {
  const [form] = Form.useForm();
  const format = 'HH:mm';
  const cancelAndResetField = () => {
    form.resetFields();
    onCancel(false, null);
  };

  form.setFieldsValue(onSubmit);
  return (
    <Modal
      visible={visible}
      title="Create booking"
      okText="Create"
      cancelText="Cancel"
      onCancel={cancelAndResetField}
      onOk={() => {
        form
          .validateFields()
          .then(data => {
            form.resetFields();
            onSubmit(data);
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
        <Form.Item name="time" label="Time">
          <Space direction="vertical">
            <DatePicker />
            <TimePicker format={format} />
          </Space>
        </Form.Item>
        <Form.Item name="note" label="Note">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

class BookingModal extends React.Component<Props> {
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

export default BookingModal;
