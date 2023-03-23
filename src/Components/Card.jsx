import styles from './Card.module.scss'


export default function Card() {
  return (
    <article>
      <img width={260} height={260} src="img/pizzas/Cheese.jpg" alt="" />
      <h2>Чизбургер-пицца</h2>

      <div className={styles.itemParams}>
        <div className={styles.param}>
          <button>тонкое</button>
          <button>традиционное</button>
        </div>
        <div className={styles.param}>
          <button>26 см.</button>
          <button>30 см.</button>
          <button>40 см.</button>
        </div>
      </div>

      <footer>
        <p>от 395 ₽</p>
        <button className={styles.add}>
          Добавить
        </button>
      </footer>
    </article>


  )
}
