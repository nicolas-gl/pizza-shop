import { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './App.module.scss';
import Header from './Components/Header';
import Main from './Components/Main';


function App() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      axios.get('https://63da6dca2af48a60a7cd9696.mockapi.io/items')
        .then(res => { setItems(res.data[0].pizzas.items) });
    } catch (error) {
      console.log("не удалось загрузить товары или корзину", error)
    };
  }, []);


  return (
    <div className={styles.wrapper}>
      <Header />
      <Main items={items} />
    </div>
  );
}

export default App;
