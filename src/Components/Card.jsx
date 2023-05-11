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

      {/* <ContentLoader
        speed={2}
        width={400}
        height={160}
        viewBox="0 0 400 160"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      // {...props}
      >
        <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
        <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
        <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
        <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
        <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
        <circle cx="20" cy="20" r="20" />
      </ContentLoader> */}

      {itemsLoading ? <ContentLoader
        speed={2}
        width={400}
        height={160}
        viewBox="0 0 400 160"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
        <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
        <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
        <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
        <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
        <circle cx="20" cy="20" r="20" />
      </ContentLoader>
        :

        <>
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
