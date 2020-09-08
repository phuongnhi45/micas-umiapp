import React from 'react';
import { Modal, Form, Input, Tooltip } from 'antd';
import { connect, Loading, ConnectProps, Dispatch } from 'umi';
import { CompanyState } from './model';

import appIcon from '@/config/icons';

const CollectionCreateForm = ({ visible, onCreate, onCancel }: any) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Edit information company"
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
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please edit name of company!',
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
              message: 'Please edit address of company!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export interface CompanyProps extends ConnectProps {
  company: CompanyState;
  dispatch: Dispatch;
  loading: boolean;
}

class EditCompany extends React.Component<CompanyProps, any> {
  state = {
    show: false,
  };

  onCreate = (values: any) => {
    const { onEdit } = this.props;
    const id = onEdit();
    this.setState({ show: false });
    this.props.dispatch({
      type: 'company/updateCompany',
      payload: { values, id },
    });
  };

  render() {
    const { show } = this.state;
    return (
      <>
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
      </>
    );
  }
}

export default connect(
  ({ company, loading }: { company: CompanyState; loading: Loading }) => ({
    company,
    loading: loading.models.company,
  }),
)(EditCompany);
