import styles from './Header.module.scss'


export default function Header() {
  return (
    <header>

      <div className={styles.headerLeft}>
        <img width={38} height={38} src="assets/img/icons/logo.svg" alt='logo' />
        <div>
          <h3>Best PIZZA shop</h3>
          <p>Cамая вкусная пицца во вселенной</p>
        </div>
      </div>

      <div className={styles.headerRight}>
        <p>520 ₽</p>
        <div className={styles.pipe}></div>
        <p>3</p>
      </div>

    </header>
  )
}
