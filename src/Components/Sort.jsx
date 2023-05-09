import { useState } from 'react'
import styles from './Sort.module.scss'

export default function Sort({ sortBy, setSortBy }) {

  const params = ["popularity", "alphabetically", "price (low-high)", "price (high-low)"];

  const [opened, setOpened] = useState(false);

  const onParamClicked = (p) => {
    setSortBy(p);
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
            {params.map(param =>
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
