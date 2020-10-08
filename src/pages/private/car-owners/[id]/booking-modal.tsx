import React from 'react';
import { Modal, Form, Input, DatePicker, Select } from 'antd';
import { IService } from 'umi';

interface Props {
  visible: boolean;
  services: IService[]
  onSubmit: (data: any) => void;
  onCancel: (isVisible: boolean, data: any) => void;
}

const CollectionForm = ({ visible, onSubmit, onCancel, services }: Props) => {
  const [form] = Form.useForm();
  const { Option } = Select;

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
        <Form.Item name="date" label="Date and Time Picker" >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item name="note" label="Note">
          <Input />
        </Form.Item>
        <Form.Item name="serviceid" label="Pick Service">
          <Select
            showSearch
            style={{ width: '50%' }}
            placeholder="Select a service"
          >
            {
              services.map((item, index) => (
                <Option value={item._id}>{item.name}</Option>
              ))
            }
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

class BookingModal extends React.Component<Props> {
  render() {
    const { visible, onSubmit, onCancel, services } = this.props;
    return (
      <div>
        <CollectionForm
          visible={visible}
          onSubmit={onSubmit}
          services={services}
          onCancel={onCancel}
        />
      </div>
    );
  }
}

export default BookingModal;
