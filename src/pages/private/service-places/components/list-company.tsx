import React from 'react';
import { Table, Checkbox, Tag } from 'antd';
import { Link, CompanyState } from 'umi';
import appIcon from '@/config/icons';

interface Props {
  onUpdate: (data: any) => void;
  companies: any;
  loading: boolean;
}

type IActiveFilterValue = 'active' | 'inactive';

class ListCompanies extends React.Component<Props> {
  state = {
    active: false,
    searchText: '',
  };

  render() {
    const { companies, loading, onUpdate } = this.props;
    const { active } = this.state;
    const columns = [
      {
        title: '#',
        align: 'center',
        key: '_id',
        render: (value: any, record: CompanyState, index: number) => index + 1,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        render: (value: string) => {
          return <Link to="/booking">{value}</Link>;
        },
      },
      {
        title: 'City',
        dataIndex: 'address',
        align: 'center',
        render: (value: any) => <Tag color="blue">{value}</Tag>,
      },
      {
        title: 'Created at',
        dataIndex: 'date',
        align: 'center',
        width: '20%',
        render: () => Date(),
      },
      {
        title: 'Active',
        dataIndex: 'active',
        align: 'center',
        filters: [
          {
            text: 'Active',
            value: 'active' as IActiveFilterValue,
          },
          {
            text: 'Inactive',
            value: 'inactive' as IActiveFilterValue,
          },
        ],
        render: (active: boolean, row: CompanyState) => {
          if (row.active) {
            return (
              <Tag
                onClick={() => onChangeStatus(active, row._id)}
                color="geekblue"
              >
                Active
              </Tag>
            );
          }
          return (
            <Tag onClick={() => onChangeStatus(active, row._id)} color="green">
              Inactive
            </Tag>
          );
        },
        filterMultiple: false,
        onFilter: (filterValue: IActiveFilterValue, record: CompanyState) =>
          record.active === (filterValue === 'active' ? true : false),
      },
      {
        title: 'Action',
        dataIndex: '_id',
        align: 'center',
        render: (value: any, row: CompanyState) => {
          return <appIcon.EditOutlined onClick={() => onUpdate(value)} />;
        },
      },
    ];

    const onChangeStatus = (active: boolean, _id: string) => {
      // this.props.dispatch({
      //   type: 'Company/changeStatusCompany',
      //   payload: { active, _id },
      // });
      console.log(active, _id);
    };

    return (
      <Table
        columns={columns}
        dataSource={companies}
        rowKey="_id"
        size="large"
        loading={loading}
      />
    );
  }
}

export default ListCompanies;
