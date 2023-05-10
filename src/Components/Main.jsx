import styles from './Main.module.scss'
import Card from './Card';
import Categories from './Categories';
import Sort from './Sort';
import { useState } from 'react';

export default function Main({ pizzas }) {

  const sortParams = ["popularity", "alphabetically", "price (low-high)", "price (high-low)"];

  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState(sortParams[0]);

  const makeActive = (category) => {
    setActiveCategory(category === activeCategory ? 'All' : category);
  };

  const sorting = (item1, item2) => {
    if (sortBy === "alphabetically") {
      return item1.title.localeCompare(item2.title);
    } else if (sortBy === "popularity") {
      return item1.id - item2.id
    }
    const sizes1 = Object.keys(item1.size_price);
    const midSize1 = sizes1[Math.ceil((sizes1.length + 1) / 2) - 1];
    const sizes2 = Object.keys(item2.size_price);
    const midSize2 = sizes2[Math.ceil((sizes2.length + 1) / 2) - 1];
    if (sortBy === "price (low-high)") {
      return item1.size_price[midSize1] - item2.size_price[midSize2];
    } else if (sortBy === "price (high-low)") {
      return item2.size_price[midSize2] - item1.size_price[midSize1];
    }
    console.log(`!!!Have no algorithm for ${sortBy} sotring`);
    return item1.title.localeCompare(item2.title);
  };

  return (
    <>
      <div className={styles.mainHeader}>
        <Categories
          activeCategory={activeCategory}
          makeActive={makeActive}
        />
        <Sort
          sortBy={sortBy}
          setSortBy={setSortBy}
          list={sortParams}
        />
      </div>


      <section className={styles.items}>
        <h1>{`${activeCategory} pizzas`}</h1>
        {pizzas.sort((a, b) => sorting(a, b)).filter(item => activeCategory === 'All' || item.properties.includes(activeCategory.toLowerCase())).map((item) =>
          <Card
            key={"Main" + item.sku}
            {...item}
          />
        )}
      </section>
    </>
  )
}