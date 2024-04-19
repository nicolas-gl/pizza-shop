import qs from 'qs';
import { useEffect } from 'react';
import { useAppSelector } from "../hooks";
import { useNavigate } from 'react-router-dom';
import { mainState } from "../Redux/Slices/filterSlice";
import { Status } from "../Redux/Slices/pizzasSlice"
import styles from './Main.module.scss'
import Card from './Card';
import Categories from './Categories';
import Sort from './Sort';
import Skeleton from './Skeleton'


export const Main: React.FC = () => {

  const { sortBy, activeCategory, searchValue } = useAppSelector(state => state.filter);
  const { items, status } = useAppSelector(state => state.pizzas);

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

  type Item = {
    id: number;
    imgAlt: string;
    imgUrl: string;
    properties: string[];
    size_price: Record<string, number>;
    sku: number;
    title: string;
  }


  const sorting = (item1: Item, item2: Item) => {
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
  }


  return (
    <>
      <div className={styles.mainHeader}>
        <Categories />
        <Sort />
      </div>

      <h1>{`${activeCategory} pizzas`}</h1>

      {status === Status.ERROR
        ? <p className={styles.error}>Getting pizzas error. Try again a little later!</p>
        : <section className={styles.content}>

          {status === Status.LOADING && [...Array(12)]
            .map((_, index) => <Skeleton key={index} />)
          }

          {status === Status.SUCESS && [...items]
            .sort((a, b) => sorting(a, b))
            .filter(
              item => item.title.toLowerCase().includes(searchValue.toLowerCase()) && (
                activeCategory === 'All' || item.properties.includes(activeCategory.toLowerCase())
              ))
            .map((item) =>
              <Card
                key={item.sku}
                {...item}
              />)
          }
        </section>
      }
    </>
  )
}

