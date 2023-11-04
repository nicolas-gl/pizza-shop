import styles from './Search.module.scss'
import { useState } from 'react';


export default function Search() {

  const [searchValue, setSearchValue] = useState('');
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div>

      <div className={styles.searchBlock}>

        {searchValue
          ? <img width={16} height={16} onClick={() => setSearchValue('')} src="assets/img/icons/x.svg" alt="reset" />
          : <img src="assets/img/icons/search.svg" alt="search" />
        }

        <input onChange={onChangeSearchInput} value={searchValue} type="text" placeholder="Find your Best..." />
      </div>
    </div>)
}
