import { createClient } from "@supabase/supabase-js";
import { useAuth, useUser } from "@clerk/nextjs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const uploadImage = async (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const user = useUser()
  const { userId } = useAuth();
  console.log(userId);
  const Hello =() => {
    const { isSignedIn, user } = useUser();
    if(!isSignedIn) {
      return null;
    }
    return (`Hello, ${user.firstName}`)}
    console.log(Hello)
  const file: File | null = event.target.files?.[0] || null;
  const { data, error } = await supabase.storage
    .from("images")
    .upload(`public/${file?.name}`, file);

  if (error) {
    console.error("Error uploading image:", error);
  } else {
    console.log("Image uploaded successfully:", data);
  }
};
