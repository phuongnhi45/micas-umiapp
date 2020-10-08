import React from 'react';
import TableList from './components/table/owners';
import SearchInput from './components/input/search-owner';
// import ListCar from './components/table/list-car';
import { connect, Loading, ConnectProps, Dispatch, Link } from 'umi';
import { CustomerState } from './models/index';

import { Button, Row, Col, Breadcrumb } from 'antd';
import lodash from 'lodash';

import appIcon from '@/config/icons';
import styles from '../index.less';

export interface CustomerProps extends ConnectProps {
  Customer: CustomerState;
  Booking: CustomerState;
  dispatch: Dispatch;
  loading: boolean;
}

class Customer extends React.Component<CustomerProps, any> {
  state = {
    isVisible: false,
    customer: null,
  };
  componentDidMount() {
    this.onFilterChange({});
  }

  onFilterChange = (newFilter = {}) => {
    const {
      Customer: { filter },
    } = this.props;
    const filters = lodash.merge(filter, newFilter);
    const query = lodash.pick(filters, ['page', 'name', 'active']);
    this.loadData(query);
  };

  loadData = (payload: any) => {
    this.props.dispatch({
      type: 'Customer/getCustomers',
      payload,
    });
  };

  onSubmit = (values: any, customer: any) => {
    if (customer) {
      // const id = customer._id;
      this.props.dispatch({
        type: 'Customer/editCustomer',
        payload: { values: values, customer: customer },
      });
    } else {
      this.props.dispatch({
        type: 'Customer/submitCustomer',
        payload: values,
      });
    }
    this.onToggleModal(null);
  };

  onToggleModal = (customer: any = null) => {
    this.setState({
      customer,
    });
  };

  onChangeStatus = (_id: any, e: any) => {
    const active = e.target.checked;
    this.props.dispatch({
      type: 'Customer/updateStatus',
      payload: { _id, active },
    });
  };

  onDelete = (_id: any) => {
    this.props.dispatch({
      type: 'Customer/deleteCustomer',
      payload: _id,
    });
  };

  onTableChange = (pagination: any) => {
    const { current } = pagination;
    this.onFilterChange({ page: current - 1 });
  };
  render() {
    const {
      loading,
      Customer: { customers, filter },
    } = this.props;
    return (
      <>
        <Row className={styles.row}>
          <Breadcrumb className={styles.breadcrumb}>
            <appIcon.ShopOutlined style={{ color: '#1890ff' }} /> CAR OWNERS
          </Breadcrumb>
          <Button type="primary">
            <Link to="/create-customer">New Customer</Link>
          </Button>
        </Row>
        <Row>
          <Col span={5}>
            <SearchInput
              onSearch={(name: string) =>
                this.onFilterChange({ name, page: 0 })
              }
            />
          </Col>
          <Col span={19}>
            <TableList
              onUpdate={this.onToggleModal}
              onDelete={this.onDelete}
              loading={loading}
              onChangeStatus={this.onChangeStatus}
              customers={customers}
              pageSize={filter.limit}
              total={filter.total}
              current={filter.page}
              onChange={this.onTableChange}
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default connect(
  ({ Customer, loading }: { Customer: CustomerState; loading: Loading }) => ({
    Customer,
    loading: loading.models.Customer,
  }),
)(Customer);
