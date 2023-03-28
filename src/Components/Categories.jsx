import styles from './Categories.module.scss'
import { useState } from 'react';

export default function Categories() {

  const categories = ["All", "Vegetarian", "Meat", "Spicy", "Seafood"]

  const [activeIndex, setActiveIndex] = useState(0);

  const makeActive = (index) => {
    setActiveIndex(index === activeIndex ? 0 : index);
  }

  return (
    <div className={styles.filter}>
      {categories.map((item, index) =>
        <button onClick={() => makeActive(index)} className={activeIndex === index ? styles.active : ''} key={item}>
          {item}
        </button >
      )}
    </div>
  )
}
