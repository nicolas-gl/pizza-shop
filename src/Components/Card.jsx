import { useState } from 'react'
import styles from './Card.module.scss'


export default function Card({ title, price, imgUrl, imgAlt, sizes }) {

  const doughs = ["Thin", "Usual"]
  const [activeDough, setActiveDough] = useState('Thin');
  const [activeSize, setActiveSize] = useState(sizes[Math.ceil((sizes.length + 1) / 2) - 1]);
  const [count, setCount] = useState(0);

  return (
    <article>
      <img width={260} height={260} src={imgUrl} alt={imgAlt} />
      <h2>{title}</h2>


      {/* change div to ul */}
      <div className={styles.itemParams}>
        <div className={styles.param}>
          {doughs.map((dough) => (
            <button
              key={dough}
              onClick={() => setActiveDough(dough)}
              className={dough === activeDough ? styles.active : ''}
            >
              {dough}
            </button>
          ))
          }
        </div>
        <div className={styles.param}>
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setActiveSize(size)}
              className={size === activeSize ? styles.active : ''}
            >
              {size}
            </button>
          ))
          }
        </div>
      </div>

      <footer>
        <p>от {price} ₽</p>
        <button className={styles.add} onClick={() => { setCount(prev => ++prev) }}>
          Add {count}
        </button>
      </footer>
    </article>


  )
}
