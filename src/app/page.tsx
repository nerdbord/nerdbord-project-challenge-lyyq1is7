import Image from "next/image";
import styles from "./page.module.css";
import { UploadForm } from "@/components/UploadForm";

export default function Home() {
  return (
    <main className={styles.main}>
      <UploadForm />
    </main>
  );
}
