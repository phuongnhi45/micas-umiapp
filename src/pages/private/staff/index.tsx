import React from 'react';
import ModalForm from './components/edit-modal';
import TableList from './components/table-list';
import SearchInput from './components/search-input';

import { connect, Loading, ConnectProps, Dispatch } from 'umi';
import { EmployeeState } from './model';

import { Button, Row, Col, Breadcrumb } from 'antd';
import lodash from 'lodash';
import appIcon from '@/config/icons';
import styles from '../index.less';

export interface EmployeeProps extends ConnectProps {
  Employee: EmployeeState;
  dispatch: Dispatch;
  loading: boolean;
}

class Staff extends React.Component<EmployeeProps, any> {
  state = {
    isVisible: false,
    staff: null,
  };

  componentDidMount() {
    this.onFilterChange({});
  }

  onFilterChange = (newFilter = {}) => {
    const {
      Employee: { filter },
    } = this.props;
    const filters = lodash.merge(filter, newFilter);
    const query = lodash.pick(filters, ['page', 'name', 'active']);
    this.loadData(query);
  };

  loadData = (payload: any) => {
    this.props.dispatch({
      type: 'Employee/getEmployees',
      payload,
    });
  };

  onSubmit = (values: any, staff: any) => {
    if (staff) {
      const id = staff._id;
      this.props.dispatch({
        type: 'Employee/editEmployee',
        payload: { values, id },
      });
    } else {
      this.props.dispatch({
        type: 'Employee/submitEmployee',
        payload: values,
      });
    }
    this.onToggleModal(false, null);
  };

  onToggleModal = (isVisible: boolean, staff: any = null) => {
    this.setState({
      isVisible,
      staff,
    });
  };

  onChangeStatus = (_id: any, e: any) => {
    const active = e.target.checked;
    this.props.dispatch({
      type: 'Employee/updateStatus',
      payload: { _id, active },
    });
  };

  onDelete = (_id: any) => {
    this.props.dispatch({
      type: 'Employee/deleteEmployee',
      payload: _id,
    });
  };

  onTableChange = (pagination: any) => {
    const { current } = pagination;
    this.onFilterChange({ page: current - 1 });
  };

  render() {
    const { isVisible, staff } = this.state;
    const {
      loading,
      Employee: { employees, filter },
    } = this.props;

    return (
      <>
        <Row className={styles.header_content}>
          <Breadcrumb className={styles.breadcrumb}>
            <appIcon.ShopOutlined style={{ color: '#1890ff' }} />
            STAFFS
          </Breadcrumb>
          <Button type="primary" onClick={() => this.onToggleModal(true)}>
            New Staff
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
              employees={employees}
              pageSize={filter.limit}
              total={filter.total}
              current={filter.page}
              onChange={this.onTableChange}
            />
          </Col>
        </Row>
        <ModalForm
          staff={staff}
          visible={isVisible}
          onSubmit={this.onSubmit}
          onCancel={this.onToggleModal}
        />
      </>
    );
  }
}

export default connect(
  ({ Employee, loading }: { Employee: EmployeeState; loading: Loading }) => ({
    Employee,
    loading: loading.models.Employee,
  }),
)(Staff);
