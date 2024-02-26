import { Link } from 'react-router-dom';
import styles from './Layout.module.css';

function Layout({ children }) {
  return (
    <>
      <header>
        <Link to="/">home</Link>
      </header>
      <main className={styles.main}>{children}</main>
      <footer>푸터</footer>
    </>
  );
}

export default Layout;
