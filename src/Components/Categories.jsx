import styles from './Categories.module.scss'


export default function Categories({ activeCategory, makeActive }) {

  const categories = ["All", "Vegetarian", "Meat", "Spicy", "Seafood"]

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
