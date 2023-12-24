import styles from './Main.module.scss'
import Card from './Card';
import Categories from './Categories';
import Sort from './Sort';
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { mainState, selectFilter } from "../Redux/Slices/filterSlice";


export default function Main() {

  const sortParams = ["popularity", "alphabetically", "price (low-high)", "price (high-low)"];

  const { sortBy, activeCategory, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(state => state.pizzas);

  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.search) {
      const queryString = qs.stringify({
        sortBy, activeCategory
      });
      navigate(`?${queryString}`);
    } else if (mainState.activeCategory !== activeCategory || mainState.sortBy !== sortBy) {
      const queryString = qs.stringify({
        sortBy, activeCategory
      });
      navigate(`?${queryString}`);
    };
  }, [navigate, sortBy, activeCategory]);

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
      {status === 'error' ? <p className={styles.error}>Getting pizzas error. Try again a little later!</p> : null}
      <section className={styles.content}>
        {status === 'loading'
          ? [...Array(12)].map((_, index) =>
            <Card
              key={index}
              itemsLoading={true}
            />)
          : [...items]
            .sort((a, b) => sorting(a, b))
            .filter(
              item => item.title.toLowerCase().includes(searchValue.toLowerCase()) && (
                activeCategory === 'All' || item.properties.includes(activeCategory.toLowerCase())
              ))
            .map((item) =>
              <Card
                key={item.sku}
                itemsLoading={false}
                {...item}
              />)
        }
      </section>
    </>
  )
}