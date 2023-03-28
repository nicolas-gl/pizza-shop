import { useState } from 'react'
import styles from './Card.module.scss'


export default function Card({ title, price, imgUrl, imgAlt }) {

  const [count, setCount] = useState(0);

  return (
    <article>
      <img width={260} height={260} src={imgUrl} alt={imgAlt} />
      <h2>{title}</h2>

      <div className={styles.itemParams}>
        <div className={styles.param}>
          <button>тонкое</button>
          <button>традиционное</button>
        </div>
        <div className={styles.param}>
          <button>26 см.</button>
          <button>30 см.</button>
          <button>40 см.</button>
        </div>
      </div>

      <footer>
        <p>от {price} ₽</p>
        <button className={styles.add} onClick={() => { setCount(prev => ++prev) }}>
          Добавить {count}
        </button>
      </footer>
    </article>


  )
}
