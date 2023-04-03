import styles from './Main.module.scss'
import Card from './Card';
import Categories from './Categories';
import { useState } from 'react';

export default function Main({ pizzas }) {

  const [activeCategory, setActiveCategory] = useState('All');

  const makeActive = (category) => {
    setActiveCategory(category === activeCategory ? 'All' : category);
  }

  // const showTemp = (item) => {
  //   console.log(item.toLowerCase());
  // };


  return (
    <>
      <div className={styles.mainHeader}>
        <Categories
          activeCategory={activeCategory}
          makeActive={makeActive}
        />
        <div className={styles.sorter}>
          <div className={styles.triangle}></div>
          Sort by:
          <button>popularity</button>
        </div>
      </div>


      <section className={styles.items}>
        <h1>All pizzas</h1>

        {pizzas.filter(item => activeCategory === 'All' || item.properties.includes(activeCategory.toLowerCase())).map((item) =>
          <Card
            key={"Main" + item.sku}
            {...item}
          />
        )}
      </section>
    </>
  )
}