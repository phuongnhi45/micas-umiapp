import React from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';

interface Props {
  onSearch: (value: any) => void;
}
const { Search } = Input;

const SearchInput = ({ onSearch }: Props) => {
  return (
    <div
      style={{
        marginRight: '10px',
        position: 'relative',
        backgroundColor: 'white',
      }}
    >
      <p style={{ fontSize: '30px', padding: '0', margin: '0' }}>Search</p>
      <Search
        style={{ padding: '10px 5px' }}
        placeholder="input search text"
        onSearch={value => onSearch(value)}
        enterButton
      />
    </div>
  );
};
export default SearchInput;
