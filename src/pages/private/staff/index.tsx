import React from 'react';
import ModalForm from './components/edit-modal';
import TableList from './components/table-list';
import { connect, Loading, ConnectProps, Dispatch, Link } from 'umi';
import { EmployeeState } from './model';
import { Button } from 'antd';
import './index.less';
import SearchInput from './components/search-input';
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
    console.log(values, 'values in form ');
    console.log(staff, 'If staff !== empty => update else create');
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

  render() {
    const { isVisible, staff } = this.state;
    const { loading } = this.props;
    return (
      <div>
        <div style={{ padding: '20px 0px' }}>
          <Button
            className="btnCreate"
            type="primary"
            onClick={() => this.onToggleModal(true)}
          >
            New Staff
          </Button>
        </div>
        <div className="listsearch">
          <SearchInput />
          <TableList
            staffs={this.props.Employee}
            onUpdate={this.onToggleModal}
            loading={loading}
          />
          <ModalForm
            staff={staff}
            visible={isVisible}
            onSubmit={this.onSubmit}
            onCancel={this.onToggleModal}
          />
        </div>
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
