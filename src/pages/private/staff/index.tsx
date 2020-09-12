import React from 'react';
import ModalForm from './components/edit-modal';
import TableList from './components/table-list';
import { connect, Loading, ConnectProps, Dispatch } from 'umi';
import { EmployeeState } from './model';

export interface EmployeeProps extends ConnectProps {
  Employee: EmployeeState;
  dispatch: Dispatch;
  loading: boolean;
}

class Staff extends React.Component<EmployeeProps, any> {
  state = {
    show: false,
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'Employee/getEmployees',
    });
  }

  onCreate = (values: any) => {
    this.setState({ show: false });
    console.log(values, 'values in form ');
    this.props.dispatch({
      type: 'Employee/submitEmployee',
      payload: values,
    });
  };

  onShow = () => {
    this.setState({ show: true });
  };

  render() {
    const { show } = this.state;
    return (
      <div>
        <ModalForm onCreate={this.onCreate} show={show} onShow={this.onShow} />
        <TableList Employee={this.props.Employee} />
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
