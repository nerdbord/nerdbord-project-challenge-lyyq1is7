import Image from "next/image";
import styles from "./page.module.css";
import UploadPhoto from "../components/UploadPhoto";

export default function Home() {
  return (
    <main className={styles.main}>
      app
      <UploadPhoto />
    </main>
  );
}
