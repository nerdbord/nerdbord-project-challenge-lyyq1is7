import { auth, currentUser } from "@clerk/nextjs/server";
import styles from "./page.module.css";

import ReadTextFromPhoto from "@/components/ReadTextFromPhoto";

import { UploadForm } from "@/components/UploadForm";


export default function Home() {
  const { userId } = auth();

  return (
    <main className={styles.main}>

      {userId ?  <UploadForm /> : <div>Sign in to upload a photo</div>}

      <UploadForm />

    </main>
  );
}
