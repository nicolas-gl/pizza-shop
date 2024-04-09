import { Link } from 'react-router-dom';
import { useState, useRef } from 'react'
import { useGetCartContext } from '../App';
import styles from './Card.module.scss'


const doughs = ["Thin", "Usual"];

type CardProps = {
  id: number,
  imgAlt: string,
  imgUrl: string,
  size_price: { [index: number]: number },
  sku: number,
  title: string,
}

const Card: React.FC<CardProps> = ({ id, sku, title, imgUrl, imgAlt, size_price }) => {

  const addButtonRef = useRef<HTMLButtonElement>(null);
  const addDivRef = useRef<HTMLInputElement>(null);

  const cloneAndAnimate = () => {

    const node = addButtonRef.current;
    const clone = node?.cloneNode(true);

    if (clone instanceof HTMLElement) {
      clone.innerHTML = "Your pizza";
      clone.classList.toggle(`${styles.clone}`);
    } else { return }

    addDivRef.current?.appendChild(clone);
    const headerCart = document.getElementById("cartButton");

    const startRect = addDivRef.current?.getBoundingClientRect();
    const finihsRect = headerCart?.getBoundingClientRect();
    const finihsHeight = headerCart?.offsetHeight;
    const finihsWidth = headerCart?.offsetWidth;


    clone.animate(
      [
        {
          position: "fixed",
          left: `${startRect?.left}px`,
          top: `${startRect?.top}px`,
          background: "#FE5F1E",
          color: "#FFF"
        },
        {
          width: `${finihsWidth}px`,
          height: `${finihsHeight}px`,
          position: "fixed",
          left: `${finihsRect?.left}px`,
          top: `${finihsRect?.top}px`,
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


  const sizes = Object.keys(size_price).map((el) => Number(el));
  const { addToCart } = useGetCartContext();

  const [activeDough, setActiveDough] = useState(doughs[0]);
  const [activeSize, setActiveSize] = useState<number>(sizes[Math.ceil((sizes.length + 1) / 2) - 1]);

  const onAddClicked = () => {
    addToCart({ id, imgAlt, imgUrl, title, sku, size: activeSize, price: size_price[activeSize], dough: activeDough, quantity: 1 })
    cloneAndAnimate();
  }


  return (
    <article>

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

    </article>
  )
}

export default Card;
