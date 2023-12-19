import { useState, useRef, useEffect } from 'react';
import styles from './Sort.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { setSortBy, selectFilter } from "../Redux/Slices/filterSlice";


export default function Sort({ list }) {

  const [opened, setOpened] = useState(false);
  const { sortBy } = useSelector(selectFilter);
  const dispatch = useDispatch();
  const sortRef = useRef();

  const onParamClicked = (p) => {
    dispatch(setSortBy(p));
    setOpened(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (opened && !event.composedPath().includes(sortRef.current)) {
        setOpened(false);
      }
    }

    document.body.addEventListener("click", handleClickOutside);

    return () => { document.body.removeEventListener("click", handleClickOutside); }
  }, [opened])


  return (
    <div ref={sortRef} className={styles.sorter}>
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
