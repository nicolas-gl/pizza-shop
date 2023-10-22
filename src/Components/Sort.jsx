import { useState } from 'react';
import styles from './Sort.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { setSortBy } from "../Redux/Slices/filterSlice";


export default function Sort({ list }) {

  const [opened, setOpened] = useState(false);
  const sortBy = useSelector(state => state.filter.sortBy);
  const dispatch = useDispatch();

  const onParamClicked = (p) => {
    dispatch(setSortBy(p));
    setOpened(false);
  }

  return (
    <div className={styles.sorter}>
      <div className={`${styles.triangle} ${opened ? styles.active : null}`} onClick={() => setOpened(!opened)}></div>
      Sort by:
      <button onClick={() => setOpened(!opened)}>{sortBy}</button>

      {opened
        ? <div className={styles.popup}>
          <ul>
            {list.map(param =>
              <li
                key={param}
                onClick={() => onParamClicked(param)}
              >
                {param}
              </li>)
            }
          </ul>
        </div>
        : null
      }
    </div>
  )
}
