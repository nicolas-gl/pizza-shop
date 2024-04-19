
import { Link, useLocation } from "react-router-dom";
import { resetState } from "../Redux/Slices/filterSlice";
import { useAppDispatch } from "../hooks";
import styles from './Header.module.scss';
import { useGetCartContext } from '../App';
import Search from './Search';


export default function Header() {

  const dispatch = useAppDispatch();

  const { cartItems } = useGetCartContext();
  const { pathname } = useLocation();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);


  return (
    <header>
      <Link to="/"
        onClick={() => dispatch(resetState())}
      >
        <div className={styles.headerBrand}>
          <img width={38} height={38} src={`${window.location.origin}/assets/img/icons/logo.svg`} alt='logo' />
          <div>
            <h3>Best PIZZA shop</h3>
            <p>The most tasty pizza in the Universe</p>
          </div>
        </div>
      </Link>

      {
        pathname[1] ? null : <Search />
      }

      <Link to="/cart" >
        <div id="cartButton" className={styles.headerCart}>
          <p>{totalPrice} ₽</p>
          <div className={styles.pipeLine}></div>
          <p>{totalCount}</p>
        </div>
      </Link>
    </header>
  )
}
