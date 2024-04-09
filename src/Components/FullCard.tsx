import { useParams, Link } from 'react-router-dom';
import { Status, selectPizza } from '../Redux/Slices/pizzasSlice';
import { useAppSelector } from "../hooks";
import Card from './Card';
import Skeleton from './Skeleton'
import styles from './Main.module.scss'


export default function FullCard() {

  const { status } = useAppSelector(state => state.pizzas);
  const { id } = useParams();
  const pizza = useAppSelector(selectPizza(Number(id)));


  return (
    <div className={styles.error}>

      {status === Status.SUCESS &&
        (pizza
          ? <>
            <h2>{pizza.title} card</h2>
            <p>
              {"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{pizza.title} pizza is a popular Italian dish consisting of a thin flatbread made from yeast dough, covered with a variety of toppings. Pizza is usually round in shape, but can also be oval or rectangular. Pizza toppings can vary greatly depending on region and personal preference. Classic Italian pizza usually includes tomato sauce, mozzarella and fresh or sun-dried tomatoes, basil, onions and olives. However, in other countries and cultures, you can find pizza with many other ingredients, such as meat, fish, seafood, mushrooms, vegetables, etc.
              <br />
              <br />
              {"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}The size of the pizza can also vary from small to large, depending on the number of eaters. Pizza dough is usually made with wheat flour, yeast, water and olive oil. During the cooking process, the dough is rolled out into a thin layer, sauce is applied to it and the filling is evenly distributed. The pizza is then placed in a preheated oven and baked at high temperature until the dough is cooked through and the cheese is melted.
              Pizza can be served as a separate dish or as an appetizer. It's great for lunch, dinner or a snack.
            </p>

            <Card
              {...pizza}
            />
          </>

          : <>
            <p>Pizzaiolo can't find in memu the Pizza you want to get. Try choose in <b><Link to={`/`}>main page</Link></b></p>
          </>
        )
      }

      {status === Status.LOADING && <Skeleton />}

      {status === Status.ERROR && <div>Error</div>}
    </div>
  )
}

