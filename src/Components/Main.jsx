import styles from './Main.module.scss'
import Card from './Card';
import Categories from './Categories';
import Sort from './Sort';
import { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../App';
import { useSelector } from "react-redux";
import qs from 'qs';
import { useNavigate } from 'react-router-dom';


export default function Main() {

  const sortParams = ["popularity", "alphabetically", "price (low-high)", "price (high-low)"];

  const { pizzas, itemsLoading } = useContext(AppContext);
  const { sortBy, activeCategory } = useSelector(state => state.filter);

  const isMounted = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortBy, activeCategory
      });
      navigate(`?${queryString}`);
    };
    isMounted.current = true;
  }, [navigate, sortBy, activeCategory])

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
        <Categories />
        <Sort
          list={sortParams}
        />
      </div>

      <h1>{`${activeCategory} pizzas`}</h1>
      <section className={styles.content}>
        {itemsLoading
          ? [...Array(12)].map((_, index) =>
            <Card
              key={index}
              itemsLoading={true}
            />)
          : pizzas.sort((a, b) => sorting(a, b)).filter(item => activeCategory === 'All' || item.properties.includes(activeCategory.toLowerCase())).map((item) =>
            <Card
              key={item.sku}
              itemsLoading={false}
              {...item}
            />
          )
        }
      </section>
    </>
  )
}