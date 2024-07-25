import { auth, currentUser } from "@clerk/nextjs/server";
import styles from "./page.module.css";
import ReadTextFromPhoto from "@/components/ReadTextFromPhoto";

export default function Home() {
  const { userId } = auth();

  return (
    <main className={styles.main}>
      {userId ? <ReadTextFromPhoto /> : <div>Sign in to upload a photo</div>}
    </main>
  );
}
