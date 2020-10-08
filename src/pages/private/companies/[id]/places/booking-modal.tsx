import React from 'react';
import { Modal, Form, Input, DatePicker, TimePicker } from 'antd';

interface Props {
  visible: boolean;
  booking: any;
  onSubmit: (data: any, booking: any) => void;
  onCancel: (isVisible: boolean, data: any) => void;
}

const CollectionForm = ({ visible, onSubmit, onCancel, booking }: Props) => {
  const [form] = Form.useForm();
  const format = 'HH:mm';
  const cancelAndResetField = () => {
    form.resetFields();
    onCancel(false, null);
  };

  form.setFieldsValue(booking ? booking : {});
  return (
    <Modal
      visible={visible}
      title={booking ? 'Edit booking' : 'Create booking'}
      okText={booking ? 'Update' : 'Create'}
      cancelText="Cancel"
      onCancel={cancelAndResetField}
      onOk={() => {
        form
          .validateFields()
          .then(data => {
            form.resetFields();
            {
              booking ? onSubmit(data, booking) : onSubmit(data, booking)
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
          name="time"
          label="Time"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker/>
          <TimePicker format={format}/>
        </Form.Item>
        <Form.Item
          name="note"
          label="Note"
        >
          <Input/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

class BookingModal extends React.Component<Props> {
  render() {
    const { visible, onSubmit, onCancel, booking } = this.props;
    return (
      <div >
        <CollectionForm
          visible={visible}
          onSubmit={onSubmit}
          onCancel={onCancel}
          booking={booking}
        />
      </div>
    );
  }
}

export default BookingModal;
