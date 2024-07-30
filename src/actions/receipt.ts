"use server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { checkUserInDatabase } from "./user";

const CATEGORIES = [
  "Clothes",
  "Cosmetics",
  "Education",
  "Electronics",
  "Entertainment",
  "Grocery",
  "Health and medicines",
  "Hobby",
  "Household items",
  "Other",
  "Restaurants and fast food",
  "Transport",
];

export async function analyzeReceipt(base64String: string): Promise<any> {
  try {
    const response = await fetch(
      "https://training.nerdbord.io/api/v1/openai/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GPT_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: `       You are a personal financial assistant. Your task is to analyze  the receipt photo from provided link and read the data needed for analysis - what amount was spent, what category of expenses, what it was spent on, in which store, date and time. The description that will be the result of your task should be short and specific.
            Answer ONLY by filling out the JSON structure correctly:
            {
              "expense": {
                "date": "date of purchase"
                "store": "store name",
                "total": "sum of money spent",
                "items": "all bought products, separated by commas",
                "category": "category of expense",
             
              }
            }
              Match the categories from the table: ${CATEGORIES.join(", ")}.
              If any of the data is not included in the receipt, enter NO DATA. If the photo is too bright, too dark or has unreadable text, return a message with an explanation.
              `,
            },
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Review this receipt, provide the required information, select the appropriate category and write a short description of your purchases.",
                },
                { type: "image_url", image_url: { url: base64String } },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log("GPT-4o Response:", JSON.stringify(data, null, 2));

    if (data.choices && data.choices.length > 0) {
      const content = data.choices[0].message.content;
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch && jsonMatch[1]) {
        try {
          const parsedContent = JSON.parse(jsonMatch[1]);
          console.log("Parsed JSON:", JSON.stringify(parsedContent, null, 2));
          return parsedContent;
        } catch (error) {
          console.error("Failed to parse extracted JSON:", error);
          return { error: "Failed to parse JSON" };
        }
      } else {
        return { error: "No JSON found in response" };
      }
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error analyzing receipt:", error);
    throw new Error("Error analyzing receipt");
  }
}

export async function saveReceipt(receiptData: any): Promise<string> {
  try {
    // Sprawdź lub utwórz użytkownika w bazie danych
    const prismaUser = await checkUserInDatabase();

    if (!prismaUser || !prismaUser.id) {
      throw new Error("No authenticated user found.");
    }

    const receipt = await prisma.receipts.create({
      data: {
        date: receiptData.date || "N/A",
        store: receiptData.store || "N/A",
        items: receiptData.items || "N/A",
        total: receiptData.total || "N/A",
        category: receiptData.category || "Other",
        image: receiptData.image || "",
        userId: prismaUser.id,
      },
    });

    return receipt.id;
  } catch (error) {
    console.error("Failed to save analyzed receipt:", error);
    throw new Error("Failed to save analyzed receipt");
  }
}

export async function fetchExpenses() {
  try {
    const prismaUser = await checkUserInDatabase();

    if (!prismaUser || !prismaUser.id) {
      throw new Error("Authenticated user not found or has no ID.");
    }

    const expenses = await prisma.receipts.findMany({
      where: { userId: prismaUser.id },
    });

    if (!expenses) {
      throw new Error("No expenses found for the user.");
    }

    return expenses;
  } catch (error) {
    console.error("Failed to load expenses:", error);
    throw new Error("Failed to load expenses");
  }
}
