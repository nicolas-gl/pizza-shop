import { useCallback, memo } from 'react';
import { setActiveCategory } from "../Redux/Slices/filterSlice"
import { useAppDispatch, useAppSelector } from "../hooks";
import { categories } from '../Redux/Slices/filterSlice';
import styles from './Categories.module.scss'


const Categories = memo(function Categories() {

  const { activeCategory } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const makeActive = useCallback((category: string) => {
    dispatch(setActiveCategory(category));
  }, [dispatch])


  return (
    <div className={styles.filter}>
      {categories.map((category) =>
        <button onClick={() => makeActive(category)} className={activeCategory === category ? styles.active : ''} key={category}>
          {category}
        </button >
      )}
    </div>
  )
});

export default Categories