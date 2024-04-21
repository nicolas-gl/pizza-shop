import { useGetCartContext } from '../App';
import styles from './Cart.module.scss'
import { CartPizza } from '../App';


const Cart: React.FC = () => {

  const { cartItems, clearCart } = useGetCartContext();
  cartItems.sort((a: CartPizza, b: CartPizza) => (a.title.localeCompare(b.title) || a.dough.localeCompare(b.dough) || a.size - b.size))

  const onClickClearCart = () => {
    if (window.confirm('Are you sure want to delete all your Pizzas?')) {
      clearCart();
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.left}>
          <img width='29px' src="assets/img/icons/cart.svg" alt="cart" />
          <h1>Cart</h1>
        </div>
        <button className={styles.right} onClick={onClickClearCart}>
          <img src="assets/img/icons/cart-clear.svg" alt="cart-clear" />
          <p>Clear cart</p>
        </button>
      </div>
      {cartItems.map((item, index: number) =>
        <Block
          key={index}
          {...item}
        />)}
    </div>
  )
}

export default Cart;



const Block: React.FC<CartPizza> = (props: CartPizza) => {

  const { addToCart, delFromCart, decrement } = useGetCartContext();

  const onMinusClicked = () => {
    if (props.quantity > 1) {
      decrement(props)
    } else {
      delFromCart(props)
    }
  }

  const onPlusClicked = () => {
    addToCart(props)
  }


  return (
    <section className={styles.block}>
      <div className={styles.separator}></div>
      <div className={styles.content}>

        <img width={80} height={80} src={props.imgUrl} alt={props.imgAlt} />
        <div className={styles.info}>
          <h2>{props.title}</h2>
          <p><b>{props.dough}</b> dough, <b>{props.size}</b> cm</p>
        </div>

        <button className={styles.add}>
          <div className={styles.minus} onClick={onMinusClicked}></div>
          <p>{props.quantity}</p>
          <div className={styles.plus} onClick={onPlusClicked}></div>
        </button>

        <p className={styles.price}><b>{props.price * props.quantity} ₽</b></p>
        <button className={styles.delete} onClick={() => delFromCart(props)}>
          <div className={styles.x}></div>
        </button>

      </div>
    </section>
  )
}

