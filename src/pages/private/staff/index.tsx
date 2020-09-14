import React from 'react';
import ModalForm from './components/edit-modal';
import TableList from './components/table-list';
import SearchInput from './components/search-input';

import { connect, Loading, ConnectProps, Dispatch } from 'umi';
import { EmployeeState } from './model';
import { Button, Row, Col, Breadcrumb } from 'antd';

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
    this.props.dispatch({
      type: 'Employee/getEmployees',
    });
  }

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

  onSearch = (value: any) => {
    console.log(value);
    this.props.dispatch({
      type: 'Employee/searchNameEmployee',
      payload: value,
    });
  };

  onToggleModal = (isVisible: boolean, staff: any = null) => {
    this.setState({
      isVisible,
      staff,
    });
  };

  render() {
    const { isVisible, staff } = this.state;
    const { loading } = this.props;
    return (
      <>
        <Row className={styles.header_content}>
          <Breadcrumb className={styles.breadcrumb}>
            <appIcon.ShopOutlined style={{ color: '#1890ff' }} /> CÔNG TY GARA,
            CỨU HỘ
          </Breadcrumb>
          <Button type="primary" onClick={() => this.onToggleModal(true)}>
            New Staff
          </Button>
        </Row>
        <Row>
          <Col span={4}>
            <SearchInput onSearch={this.onSearch} />
          </Col>
          <Col span={20}>
            <TableList
              staffs={this.props.Employee}
              onUpdate={this.onToggleModal}
              loading={loading}
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
