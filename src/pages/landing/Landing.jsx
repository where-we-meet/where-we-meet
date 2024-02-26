import styles from './Landing.module.css';

function Landing() {
  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Where We Meet</h1>
      <form className={styles.form}>
        <input></input>
        <button>만들기</button>
      </form>
    </section>
  );
}

export default Landing;
