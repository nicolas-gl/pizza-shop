import styles from './App.module.scss';
import Header from './Components/Header';
import Main from './Components/Main';


function App() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Main />
    </div>
  );
}

export default App;
