import React from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const SearchInput = () => {
  return (
    <div style={{ marginRight: '10px' }}>
      <Search
        placeholder="input search text"
        onSearch={value => console.log(value)}
      />
    </div>
  );
};
export default SearchInput;
