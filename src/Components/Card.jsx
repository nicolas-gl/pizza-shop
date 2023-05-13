import { useState } from 'react'
import styles from './Card.module.scss'
import ContentLoader from 'react-content-loader'


export default function Card({ item, title, imgUrl, imgAlt, size_price = [], itemsLoading }) {

  const sizes = Object.keys(size_price);
  const doughs = ["Thin", "Usual"];

  const [activeDough, setActiveDough] = useState('Thin');
  const [activeSize, setActiveSize] = useState(sizes[Math.ceil((sizes.length + 1) / 2) - 1]);
  const [count, setCount] = useState(0);


  return (
    <article>
      {itemsLoading
        ? <ContentLoader
          speed={2}
          width={292}
          height={485}
          viewBox="0 0 292 485"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <circle cx="146" cy="130" r="130" />
          <rect x="46" y="280" rx="0" ry="0" width="200" height="28" />
          <rect x="0" y="325" rx="10" ry="10" width="292" height="85" />
          <rect x="10" y="434" rx="0" ry="0" width="65" height="25" />
          <rect x="160" y="426" rx="22" ry="22" width="132" height="40" />
        </ContentLoader>
        : <>
          <img width={260} height={260} src={imgUrl} alt={imgAlt} />
          <h2>{title}</h2>

          <ul className={styles.itemParams}>
            <li className={styles.param}>
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
            </li>
            <li className={styles.param}>
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
            </li>
          </ul>

          <footer>
            <p>{size_price[activeSize]} ₽</p>
            <button className={styles.add} onClick={() => { setCount(prev => ++prev) }}>
              Add {count}
            </button>
          </footer>
        </>
      }
    </article>
  )
}
