import { useContext } from 'react'
import { AppContext } from '../App';
import styles from './Cart.module.scss'


export default function Cart() {

  const { cartItems, addToCart, delFromCart, decrease } = useContext(AppContext);
  cartItems.sort((a, b) => (a.title.localeCompare(b.title) || a.dough.localeCompare(b.dough) || a.size - b.size))

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.left}>
          <img width='29px' src="assets/img/icons/cart.svg" alt="cart" />
          <h1>Cart</h1>
        </div>
        <button className={styles.right} onClick={() => delFromCart()}>
          <img src="assets/img/icons/cart-clear.svg" alt="cart-clear" />
          <p>Clear cart</p>
        </button>
      </div>
      {cartItems.map((item, index) =>
        <Block
          addToCart={addToCart}
          delFromCart={delFromCart}
          decrease={decrease}
          key={index}
          {...item}
        />)}
    </div>
  )
}



function Block({ quantity, imgUrl, sku, id, title, size, price, dough, imgAlt, addToCart, delFromCart, decrease }) {

  const onMinusClicked = () => {
    if (quantity > 1) {
      decrease({ title, sku, id, size, price, imgUrl, imgAlt, dough })
    } else {
      delFromCart({ title, sku, id, size, price, imgUrl, imgAlt, dough })
    }
  }

  const onPlusClicked = () => {
    addToCart({ title, sku, id, size, price, imgUrl, imgAlt, dough })
  }


  return (
    <section className={styles.block}>
      <div className={styles.separator}></div>
      <div className={styles.content}>

        <img width={80} height={80} src={imgUrl} alt={imgAlt} />
        <div className={styles.info}>
          <h2>{title}</h2>
          <p><b>{dough}</b> dough, <b>{size}</b> cm</p>
        </div>

        <button className={styles.add}>
          <div className={styles.minus} onClick={onMinusClicked}></div>
          <p>{quantity}</p>
          <div className={styles.plus} onClick={onPlusClicked}></div>
        </button>

        <p className={styles.price}><b>{price * quantity} ₽</b></p>
        <button className={styles.delete} onClick={() => delFromCart({ sku, size, dough })}>
          <div className={styles.x}></div>
        </button>

      </div>
    </section>
  )
}

