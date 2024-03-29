import { useState, useContext, useRef } from 'react'
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import Skeleton from './Skeleton'
import styles from './Card.module.scss'


export default function Card({ id, sku, title, imgUrl, imgAlt, size_price = [], itemsLoading }) {

  const addButtonRef = useRef();
  const addDivRef = useRef();

  const cloneAndAnimate = () => {

    const node = addButtonRef.current;
    const clone = node.cloneNode(true);
    clone.innerHTML = "Your pizza";
    clone.classList.toggle(`${styles.clone}`);
    addDivRef.current.appendChild(clone);

    const headerCart = document.getElementById("cartButton");

    const startRect = addDivRef.current.getBoundingClientRect();
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
  };


  const sizes = Object.keys(size_price);
  const doughs = ["Thin", "Usual"];

  const { addToCart } = useContext(AppContext);
  const [activeDough, setActiveDough] = useState(doughs[0]);
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

          <Link to={`/pizzas/${id}`}>
            <img width={260} height={260} src={`${window.location.origin}/${imgUrl}`} alt={imgAlt} />
          </Link>

          <Link to={`/pizzas/${id}`}>
            <h2>{title}</h2>
          </Link>

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
            <div ref={addDivRef} className={styles.addBlock}>
              <button ref={addButtonRef} className={styles.add} onClick={onAddClicked}>
                Add
              </button>
            </div>
          </footer>
        </>
      }
    </article>
  )
}
