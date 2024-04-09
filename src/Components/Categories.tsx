import styles from './Categories.module.scss'
import { useSelector, useDispatch } from "react-redux";
import { selectFilter, setActiveCategory } from "../Redux/Slices/filterSlice"
import { useAppSelector } from "../hooks";


export default function Categories() {

  const categories = ["All", "Vegetarian", "Meat", "Spicy", "Seafood"];

  const { activeCategory } = useAppSelector(state => state.filter);
  const dispatch = useDispatch();

  const makeActive = (category: string) => {
    dispatch(setActiveCategory(category));
  };


  return (
    <div className={styles.filter}>
      {categories.map((category) =>
        <button onClick={() => makeActive(category)} className={activeCategory === category ? styles.active : ''} key={category}>
          {category}
        </button >
      )}
    </div>
  )
}
