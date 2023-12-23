import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import Card from './Card';


export default function FullCard() {

  const { id } = useParams();
  const { items, status } = useSelector(state => state.pizzas);
  const pizza = items.find(el => { return el.id === id });


  return (
    <>
      <div>FullCard</div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A mollitia porro dolores! Dolores, voluptatibus totam? Nostrum porro laboriosam asperiores placeat fugiat odio? Quas molestias nesciunt modi iusto eligendi odio fugiat.</p>

      {status === 'success'
        ? <Card
          itemsLoading={false}
          {...pizza}
        />
        : null
      }

      {status === 'loading'
        ? <Card
          itemsLoading={true}
        />
        : status === 'error' ? <div>Error</div> : null
      }
    </>
  )
}