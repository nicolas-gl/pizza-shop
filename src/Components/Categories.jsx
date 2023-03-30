import styles from './Categories.module.scss'


export default function Categories({ activeCategory, makeActive }) {

  const categories = ["All", "Vegetarian", "Meat", "Spicy", "Seafood"]

  return (
    <div className={styles.filter}>
      {categories.map((item) =>
        <button onClick={() => makeActive(item)} className={activeCategory === item ? styles.active : ''} key={item}>
          {item}
        </button >
      )}
    </div>
  )
}
