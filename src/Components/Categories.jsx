import styles from './Categories.module.scss'
import { useSelector, useDispatch } from "react-redux";
import { setActiveCategory } from "../Redux/Slices/filterSlice"


export default function Categories() {

  const categories = ["All", "Vegetarian", "Meat", "Spicy", "Seafood"];

  const activeCategory = useSelector(state => state.filter.activeCategory);
  const dispatch = useDispatch();

  const makeActive = (category) => {
    dispatch(setActiveCategory(category));
  };


  return (
    <div className={styles.filter}>
      {categories.map((category, index) =>
        <button onClick={() => makeActive(categories[index])} className={activeCategory === category ? styles.active : ''} key={category}>
          {category}
        </button >
      )}
    </div>
  )
}
