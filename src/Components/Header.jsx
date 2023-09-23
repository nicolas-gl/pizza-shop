import styles from './Header.module.scss';
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { AppContext } from '../App';


export default function Header() {

  const { cartItems } = useContext(AppContext);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header>
      <Link to="/" >
        <div className={styles.headerBrand}>
          <img width={38} height={38} src="assets/img/icons/logo.svg" alt='logo' />
          <div>
            <h3>Best PIZZA shop</h3>
            <p>The most tasty pizza in the Universe</p>
          </div>
        </div>
      </Link>

      <Link to="/cart" >
        <div id={"cart"} className={styles.headerCart}>
          <p>{totalPrice} ₽</p>
          <div className={styles.pipeLine}></div>
          <p>{totalCount}</p>
        </div>
      </Link>
    </header>
  )
}
