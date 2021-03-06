import React from 'react';
import { Input } from 'antd';

import styles from '../../index.less';

interface Props {
  onSearch: (value: any) => void;
}

const { Search } = Input;

const SearchName = ({ onSearch }: Props) => {
  return (
    <div className={styles.search_column}>
      <h2 className={styles.search}>Search</h2>
      <Search
        style={{ padding: '8px 2px' }}
        placeholder="Input search name"
        onSearch={value => onSearch(value)}
        enterButton
      />
    </div>
  );
};

export default SearchName;
