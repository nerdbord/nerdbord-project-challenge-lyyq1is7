import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function checkUserInDatabase() {
  try {
    const user = await currentUser();
    if (user) {
      let existingUser = await prisma.user.findUnique({
        where: { id: user.id },
      });

      if (!existingUser) {
        existingUser = await prisma.user.create({
          data: {
            id: user.id,
            email: user.emailAddresses[0].emailAddress,
            name: `${user.firstName} ${user.lastName}`,
          },
        });
      }

      return existingUser;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error checking/creating user:", error);
    throw error;
  }
}
