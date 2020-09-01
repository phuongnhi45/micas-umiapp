import React from 'react';
import ModalForm from './components/ModalForm';
import TableList from './components/TableList';
export default class ServicePlace extends React.Component {
  handleChange(value: any) {
    console.log(`Selected: ${value}`);
  }
  render() {
    return (
      <div>
        <p>This is account page.</p>
        <ModalForm />
        <TableList />
      </div>
    );
  }
}
