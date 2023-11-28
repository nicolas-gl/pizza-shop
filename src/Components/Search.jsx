import { useEffect, useState, useRef, useContext, useMemo } from 'react';
import { AppContext } from '../App';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';


export default function Search() {

  const { searchValue, setSearchValue } = useContext(AppContext);
  const [nowValue, setNowValue] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    setSearchValue('');
  }, [setSearchValue]);

  const getSearchItems = useMemo(() => debounce((value) => setSearchValue(value), 500), [setSearchValue]);

  const onChangeSearchInput = (event) => {
    setNowValue(event.target.value);
    getSearchItems(event.target.value);
  };

  const onReset = () => {
    setSearchValue('');
    setNowValue('');
    inputRef.current.focus();
  };


  return (
    <div className={styles.searchBlock}>
      {searchValue
        ? <img width={16} height={16} onClick={() => onReset()} src="assets/img/icons/x.svg" alt="reset" />
        : <img src="assets/img/icons/search.svg" alt="search" />
      }
      <input
        autoComplete="off"
        ref={inputRef}
        id="searchInput"
        onChange={onChangeSearchInput}
        value={nowValue}
        placeholder="Find your Best..." />
    </div>)
}
