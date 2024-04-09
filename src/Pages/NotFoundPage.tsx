import { Link } from 'react-router-dom';
import styles from '../App.module.scss';


export default function NotFound() {
  return (
    <div className={styles.wrapper}>The 404 error welcomes you! Please, look at <b><Link to={`/`}>main page</Link></b></div>
  )
}
