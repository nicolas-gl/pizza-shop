import { useState, useContext } from 'react'
import { AppContext } from '../App';
import ContentLoader from 'react-content-loader'
import styles from './Card.module.scss'


export default function Card({ sku, title, imgUrl, imgAlt, size_price = [], itemsLoading }) {

  const { addToCart } = useContext(AppContext);

  const cloneAndAnimate = () => {

    const node = document.getElementById(`${sku}-add`);
    const clone = node.cloneNode(true);
    clone.innerHTML = "your pizza"
    clone.removeAttribute("id");
    clone.classList.toggle(`${styles.clone}`)
    document.getElementById(`${sku}-div`).appendChild(clone);

    const headerCart = document.getElementById("cart");
    const startRect = document.getElementById(`${sku}-div`).getBoundingClientRect();
    const finihsRect = headerCart.getBoundingClientRect();
    const finihsHeight = headerCart.offsetHeight;
    const finihsWidth = headerCart.offsetWidth;

    clone.animate(
      [
        {
          position: "fixed",
          left: `${startRect.left}px`,
          top: `${startRect.top}px`,
          background: "#FE5F1E",
          color: "#FFF"
        },
        {
          width: `${finihsWidth}px`,
          height: `${finihsHeight}px`,
          position: "fixed",
          left: `${finihsRect.left}px`,
          top: `${finihsRect.top}px`,
          opacity: 0,
          display: "none"
        }
      ],
      {
        duration: 600,
        easing: "ease-out",
        fill: "forwards",
      },
    );

  }

  const sizes = Object.keys(size_price);
  const doughs = ["Thin", "Usual"];

  const [activeDough, setActiveDough] = useState('Thin');
  const [activeSize, setActiveSize] = useState(sizes[Math.ceil((sizes.length + 1) / 2) - 1]);

  const onAddClicked = () => {
    addToCart({ title, sku, size: activeSize, price: size_price[activeSize], imgUrl, imgAlt, dough: activeDough })
    cloneAndAnimate();
  }


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
            <div id={`${sku}-div`} className={styles.addBlock}>
              <button className={styles.add} id={`${sku}-add`} onClick={onAddClicked}>
                Add
              </button>
            </div>
          </footer>
        </>
      }
    </article>
  )
}
