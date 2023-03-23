import React from 'react'
import styles from './Main.module.scss'
import Card from './Card';

export default function Main() {
  return (
    <>
      <div className={styles.mainHeader}>
        <div className={styles.filter}>
          <button>Все</button>
          <button>Мясные</button>
          <button>Вегетарианская</button>
          <button>Гриль</button>
          <button>Острые</button>
          <button>Закрытые</button>
        </div>
        <div className={styles.sorter}>
          <div className={styles.triangle}></div>
          Сортировка по:
          <button>популярности</button>
        </div>
      </div>


      <section className={styles.items}>
        <h1>Все пиццы</h1>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </section>
    </>
  )
}