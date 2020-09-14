import React from 'react';
import { Input } from 'antd';

import styles from '../../index.less';

interface Props {
  onSearch: (value: any) => void;
}

const { Search } = Input;

const SearchName = ({ onSearch }: Props) => {
  return (
    <div
      style={{
        marginRight: '10px',
        backgroundColor: 'white',
      }}
    >
      <h2 className={styles.search}>Search</h2>
      <Search
        style={{ width: '100%' }}
        placeholder="input name text"
        onSearch={value => onSearch(value)}
        enterButton
      />
    </div>
  );
};

export default SearchName;
