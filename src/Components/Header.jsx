import styles from './Header.module.scss'
import { Link } from "react-router-dom";


export default function Header() {
  return (

    <header>
      <Link to="/" >
        <div className={styles.headerLeft}>
          <img width={38} height={38} src="assets/img/icons/logo.svg" alt='logo' />
          <div>
            <h3>Best PIZZA shop</h3>
            <p>The most tasty pizza in the Universe</p>
          </div>
        </div>
      </Link>

      <Link to="/cart" >
        <div className={styles.headerRight}>
          <p>520 ₽</p>
          <div className={styles.pipe}></div>
          <p>3</p>
        </div>
      </Link>
    </header>
  )
}
