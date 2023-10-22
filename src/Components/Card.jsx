import { useState, useContext } from 'react'
import { AppContext } from '../App';
import Skeleton from './Skeleton'
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
        ? <Skeleton />
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
