import { useEffect, useState, useRef, useMemo } from 'react';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';
import { useSelector } from "react-redux";
import { selectFilter, setSearchValue } from "../Redux/Slices/filterSlice";
import { useAppDispatch } from '../hooks';


export default function Search() {

  const { searchValue } = useSelector(selectFilter);
  const [nowValue, setNowValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const getSearchItems = useMemo(() => debounce((value) => dispatch(setSearchValue(value)), 500), [dispatch]);

  const onChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNowValue(event.target.value);
    getSearchItems(event.target.value);
  };

  const onReset = () => {
    dispatch(setSearchValue(''));
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (!searchValue) {
      setNowValue("");
    };
  }, [searchValue]);


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
    </div>
  )
}
