import React from 'react';
import { Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import { connect, CustomerState, Loading, Dispatch } from 'umi';
import './index.less';

function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
interface PageProps {
  cus: any;
  dispatch: Dispatch;
  Customer: CustomerState;
  loading: boolean;
}

class Avatar extends React.Component<PageProps, any> {
  state = {
    fileList: [],
  };

  beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      return message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      return message.error('Image must smaller than 2MB!');
    }
    if (isJpgOrPng && isLt2M) {
      this.props.dispatch({
        type: 'Customer/postAvatar',
        payload: { file: file, customer: this.props.cus },
      });
      return isJpgOrPng && isLt2M;
    }
  };

  handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: this.props.loading });
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        const file = info.file.originFileObj;
        this.setState({
          imageUrl,
          loading: this.props.loading,
        });
      });
    }
  };

  render() {
    const {
      Customer: { customer },
    } = this.props;

    const { imageUrl }: any = this.state;
    const uploadButton = (
      <img
        className="cus-avatar"
        src={`http://micasvn.ddns.net:9999/resources/img/${customer.largeimage}`}
        style={{ borderRadius: '50%' }}
      />
    );

    return (
      <ImgCrop grid>
        <Upload
          beforeUpload={this.beforeUpload}
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          onChange={this.handleChange}
        >
          <div>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                className="cus-avatar"
                style={{ borderRadius: '50%' }}
              />
            ) : (
              uploadButton
            )}
          </div>
        </Upload>
      </ImgCrop>
    );
  }
}

export default connect(
  ({ Customer, loading }: { Customer: CustomerState; loading: Loading }) => ({
    Customer,
    loading: loading.models.Customer,
  }),
)(Avatar);
