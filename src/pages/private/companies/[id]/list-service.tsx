import React from 'react';
import { Table, Tag, Button, Popconfirm, Checkbox } from 'antd';
import { IService, history } from 'umi';

import appIcon from '@/config/icons';
import styles from '../../index.less';

interface Props {
  // onChangeStatus: (active: boolean, _id: string) => void;
  services: IService[];
  loading: boolean;
  onDelete: (_id: string) => void;
}

class ListService extends React.Component<Props> {
  state = {
    active: false,
  };
  
  render() {
    const { active } = this.state;
    const { services, loading, onDelete, } = this.props;

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
                // onChange={e => onChangeStatus(value, e)}
              />
            );
          } else {
            return (
              <Checkbox
                checked={active}
                // onChange={e => onChangeStatus(value, e)}
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
                // onClick={() => this.goToEdit(row)}
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
      <Button type="primary" style={{marginBottom: '10px'}}>Create</Button>
      <Table
        columns={columns}
        dataSource={services}
        // onChangeStatus={this.onChangeStatus}
        rowKey="_id"
        size="large"
        loading={loading}
        style={{borderTop: '1px solid #cccccc'}}
      />
    </div>
    )
  }
}

export default ListService;