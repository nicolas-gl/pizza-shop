import { useState, useRef, useEffect } from 'react';
import styles from './Sort.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { setSortBy, selectFilter } from "../Redux/Slices/filterSlice";
import { useAppSelector, useAppDispatch } from "../hooks";


type SortProps = {
  list: string[]
};

const Sort: React.FC<SortProps> = ({ list }) => {

  const [opened, setOpened] = useState(false);
  const { sortBy } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();
  const sortRef = useRef<HTMLDivElement>(null);

  const onParamClicked = (param: string) => {
    dispatch(setSortBy(param));
    setOpened(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (opened && sortRef.current && !event.composedPath().includes(sortRef.current)) {
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

export default Sort