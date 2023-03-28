import styles from './Main.module.scss'
import Card from './Card';
import Categories from './Categories';

export default function Main({ items }) {
  return (
    <>
      <div className={styles.mainHeader}>
        <Categories />
        <div className={styles.sorter}>
          <div className={styles.triangle}></div>
          Сортировка по:
          <button>популярности</button>
        </div>
      </div>


      <section className={styles.items}>
        <h1>Все пиццы</h1>
        {items.map((item) =>
          <Card
            key={"Main" + item.sku}
            {...item}
          />)}
      </section>
    </>
  )
}