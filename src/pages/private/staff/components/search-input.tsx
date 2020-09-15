import React from 'react';
import { Input } from 'antd';

import styles from '../../index.less';

interface Props {
  onSearch: (value: any) => void;
}

const { Search } = Input;

const SearchInput = ({ onSearch }: Props) => {
  return (
    <div className={styles.search_column}>
      <h2 className={styles.search}>Search</h2>
      <Search
        style={{ padding: '8px 5px' }}
        placeholder="input search text"
        onSearch={value => onSearch(value)}
        enterButton
      />
    </div>
  );
};

export default SearchInput;
