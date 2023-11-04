import styles from './Search.module.scss'
import { useState, useRef } from 'react';


export default function Search() {


  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef();

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const onReset = () => {
    setSearchValue('');
    inputRef.current.focus();
  };


  return (
    <div className={styles.searchBlock}>
      {searchValue
        ? <img width={16} height={16} onClick={() => onReset()} src="assets/img/icons/x.svg" alt="reset" />
        : <img src="assets/img/icons/search.svg" alt="search" />
      }
      <input
        ref={inputRef}
        id="searchInput"
        onChange={onChangeSearchInput}
        value={searchValue}
        placeholder="Find your Best..." />
    </div>)
}
