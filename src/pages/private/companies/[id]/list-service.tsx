import React from 'react';
import { Table, Tag, Button, Popconfirm, Checkbox } from 'antd';
import { IService, Dispatch, connect, CompanyState, Loading, Link } from 'umi';

import appIcon from '@/config/icons';
import styles from '../../index.less';
import ServiceModal from './places/service-modal';

interface Props {
  onChangeStatusService: (value: string, e: any) => void;
  services: IService[];
  loading: boolean;
  company: any
  dispatch: Dispatch;
  onDelete: (_id: string) => void;
}

class ListService extends React.Component<Props> {
  state = {
    active: false,
    isVisible: false,
    service: null,
  };

  onToggleModal = (isVisible: boolean, service: any = null) => {
    this.setState({
      isVisible,
      service,
    });
  };

  onSubmit = (data: any, service: any, company: any) => {
    if (!service) {
      const values = Object.assign(data, { companyid: company._id });
      this.props.dispatch({
        type: 'Company/createService',
        payload: values
      });
    } else {
      const id = service._id
      const _id = company._id
      this.props.dispatch({
        type: 'Company/editService',
        payload: { data, id, _id }
      });
    }
    this.onToggleModal(false, null);
  }
  
  render() {
    const { active, isVisible, service } = this.state;
    const { services, loading, onDelete, onChangeStatusService, company } = this.props;

    const columns: any = [
      {
        title: '#',
        align: 'center',
        render: (value: any, record: IService, index: number) => index + 1,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (value: string, row: IService) => {
          return <Link style={{textTransform: 'capitalize'}} to={{ pathname: `/services/${row._id}` }}>{value}</Link>
        },
      },
      {
        title: 'Type',
        align: 'center',
        render: () => <Tag color="blue">Garage</Tag>,
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        align: 'center',
      },
      {
        title: 'Active',
        dataIndex: '_id',
        align: 'center',
        render: (value: any, row: IService) => {
          if (row.active) {
            return (
              <Checkbox
                checked={!active}
                onChange={e => onChangeStatusService(value, e)}
              />
            );
          } else {
            return (
              <Checkbox
                checked={active}
                onChange={e => onChangeStatusService(value, e)}
              />
            );
          }
        },
      },
      {
        title: 'Action',
        align: 'center',
        render: (row: IService) => {
          return (
            <div className={styles.action}>
              <Button
                icon={<appIcon.EditOutlined />}
                onClick={() => this.onToggleModal(true, row)}
              />
              <Popconfirm
                title="Are you sure？"
                okText="Yes"
                cancelText="No"
                onConfirm={() => onDelete(row._id)}
              >
                <Button icon={<appIcon.DeleteOutlined />} />
              </Popconfirm>
            </div>
          );
        },
      },
    ]

    return (
    <div className={styles.list_services}>
      <Button type="primary" 
        style={{marginBottom: '10px'}} 
        onClick={() => this.onToggleModal(true)}
      >
        Create
      </Button>
      <Table
        columns={columns}
        dataSource={services}
        rowKey="_id"
        size="large"
        loading={loading}
        bordered
      />
      <ServiceModal
        visible={isVisible}
        service={service}
        onSubmit={this.onSubmit}
        onCancel={this.onToggleModal}
        company={company}
      />
    </div>
    )
  }
}

export default connect(
  ({ Company, loading }: { Company: CompanyState; loading: Loading }) => ({
    Company,
    loading: loading.models.Company,
  }),
)(ListService);