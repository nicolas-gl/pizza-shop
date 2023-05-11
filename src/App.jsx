import { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './App.module.scss';
import Header from './Components/Header';
import Main from './Components/Main';


function App() {

  const [items, setItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(true);


  useEffect(() => {
    try {
      axios.get('https://63da6dca2af48a60a7cd9696.mockapi.io/items')
        .then(res => {
          setItems(res.data[0].pizzas.items);
          setItemsLoading(false);
        });
    } catch (error) {
      console.log("не удалось загрузить товары или корзину", error)
    };
  }, []);


  return (
    <div className={styles.wrapper}>
      <Header />
      <Main
        pizzas={items}
        itemsLoading={itemsLoading}
      />
    </div>
  );
}

export default App;
