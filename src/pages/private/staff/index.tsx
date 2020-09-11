import React from 'react';
import ModalForm from './components/edit-modal';
import TableList from './components/table-list';
import { connect, Loading, ConnectProps, Dispatch, Link } from 'umi';
import { EmployeeState } from './model';
import { Button } from 'antd';
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

  onSubmit = (values: any, staffId: string = '') => {
    console.log(values, 'values in form ');
    console.log(staffId, 'If staff !== empty => update else create');
    this.props.dispatch({
      type: 'Employee/submitEmployee',
      payload: values,
      staffId,
    });
    this.onToggleModal(false, null);
  };

  onToggleModal = (isVisible: boolean, staff: any = null) => {
    this.setState({
      isVisible,
      staff,
    });
  };

  render() {
    const { isVisible, staff } = this.state;
    return (
      <div>
        <div style={{ padding: '20px 0px' }}>
          <Button type="primary" onClick={() => this.onToggleModal(true)}>
            New Staff
          </Button>
        </div>
        <TableList staffs={this.props.Employee} onUpdate={this.onToggleModal} />
        <ModalForm
          staff={staff}
          visible={isVisible}
          onSubmit={this.onSubmit}
          onCancel={this.onToggleModal}
        />
      </div>
    );
  }
}

export default connect(
  ({ Employee, loading }: { Employee: EmployeeState; loading: Loading }) => ({
    Employee,
    loading: loading.models.Employee,
  }),
)(Staff);
// bên index này thực hiện, tất cả đều truyền từ index này qua 2 files kia,
//có id hay ko
