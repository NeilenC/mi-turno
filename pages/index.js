import Head from "next/head";
import styles from "../styles/Home.module.css";
import Login from "../components/Login";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Mi turno</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Login />
    </div>
  );
}
