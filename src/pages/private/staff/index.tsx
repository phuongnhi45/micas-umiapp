import React from 'react';
import ModalForm from './components/ModalForm';
import TableList from './components/TableList';

export default class ServicePlace extends React.Component {
  render() {
    return (
      <div>
        <ModalForm />
        <TableList />
      </div>
    );
  }
}
