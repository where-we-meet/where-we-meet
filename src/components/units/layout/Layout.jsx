import styles from './Layout.module.css';

function Layout({ children }) {
  return (
    <>
      <main className={styles.main}>{children}</main>
    </>
  );
}

export default Layout;
