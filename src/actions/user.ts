'use server'
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function checkUserInDatabase() {
  try {
    const user = await currentUser();
    if (user) {
      let existingUser = await prisma.user.findUnique({
        where: { email: user.emailAddresses[0].emailAddress },
      });

      if (!existingUser) {
        const newUser = {
          email: user.emailAddresses[0].emailAddress,
          name: `${user.firstName} ${user.lastName}`,
        };

        existingUser = await prisma.user.create({
          data: newUser,
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
