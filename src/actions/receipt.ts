"use server";
import { prisma } from "@/lib/prisma";
import { checkUserInDatabase } from "./user";
import { Expense } from "@/components/Expenses";
import * as XLSX from "xlsx";

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
              content: `You are a personal financial assistant. Your task is to analyze  the receipt photo from provided link and read the data needed for analysis - what amount was spent, what category of expenses, what it was spent on, in which store, date and time. The description that will be the result of your task should be short and specific.
            Answer ONLY by filling out the JSON structure correctly:
            {
              "expense": {
                "date": "date of purchase"
                "store": "store name",
                "total": "sum of money spent as number",
                "currency": "CURRENCY",
                "items": "all bought products, separated by commas",
                "category": "category of expense",
             
              }
            }
              Match the categories from the table: ${CATEGORIES.join(", ")}.
              If any of the data is not included in the receipt, enter NO DATA. If the photo is too bright or too dark or has unreadable text or is not a receipt return a JSON with an explanation:
            {
              "error": {
                "message": "explanation of the problem"
            }
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
    console.log("DATA => ", data);
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
    throw error;
  }
}

export async function saveReceipt(receiptData: any): Promise<string> {
  try {
    const prismaUser = await checkUserInDatabase();

    if (!prismaUser || !prismaUser.id) {
      console.log("unauthorised user");
      return "unauthorised user";
    }

    const receipt = await prisma.receipts.create({
      data: {
        date: receiptData.date || "N/A",
        store: receiptData.store || "N/A",
        items: receiptData.items || "N/A",
        total: receiptData.total || "N/A",
        currency: receiptData.currency || "N/A",
        category: receiptData.category || "Other",
        image: receiptData.image || "",
        userId: prismaUser?.id,
      },
    });

    return receipt.id;
  } catch (error) {
    console.error("Failed to save analyzed receipt:", error);
    throw error;
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
    throw error;
  }
}

export async function deleteExpense(id: string): Promise<void> {
  try {
    const prismaUser = await checkUserInDatabase();

    if (!prismaUser || !prismaUser.id) {
      throw new Error("Authenticated user not found or has no ID.");
    }

    await prisma.receipts.delete({
      where: { id, userId: prismaUser.id },
    });
  } catch (error) {
    console.error("Failed to delete expense:", error);
    throw error;
  }
}

export async function fetchExpenseById(id: string) {
  try {
    const expense = await prisma.receipts.findUnique({
      where: { id: id },
    });

    if (!expense) {
      throw new Error(`Expense with ID ${id} not found`);
    }

    return expense;
  } catch (error) {
    console.error("Failed to fetch expense:", error);
    throw error;
  }
}

export async function updateExpense(
  id: string,
  updatedData: any
): Promise<void> {
  try {
    const prismaUser = await checkUserInDatabase();

    if (!prismaUser || !prismaUser.id) {
      throw new Error("Authenticated user not found or has no ID.");
    }

    const expense = await prisma.receipts.findUnique({
      where: { id: id },
    });

    if (!expense) {
      throw new Error(`Expense with ID ${id} not found`);
    }

    if (expense.userId !== prismaUser.id) {
      throw new Error("Unauthorized to update this expense");
    }

    await prisma.receipts.update({
      where: { id: id },
      data: {
        date: updatedData.date || expense.date,
        store: updatedData.store || expense.store,
        items: updatedData.items || expense.items,
        total: updatedData.total || expense.total,
        category: updatedData.category || expense.category,
        image: updatedData.image || expense.image,
      },
    });
  } catch (error) {
    console.error("Failed to update expense:", error);
    throw error;
  }
}
export async function generateReport(
  expenses: Expense[],
  startDate: string,
  endDate: string
) {
  const filteredData = expenses.filter((expense) => {
    const expenseDate = expense.date ? new Date(expense.date) : null;
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (!expenseDate) return false;

    if (start && expenseDate < start) return false;
    if (end && expenseDate > end) return false;

    return true;
  });

  const worksheetData = filteredData.map((expense) => ({
    Date: expense.date || "N/A",
    Store: expense.store || "N/A",
    Items: expense.items || "N/A",
    Total: expense.total !== null ? expense.total.toString() : "N/A",
    Currency: expense.currency || "N/A",
    Category: expense.category || "N/A",
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
  XLSX.writeFile(workbook, "Expenses_Report.xlsx");
}

export async function scanReceipt(base64String: string): Promise<any> {
  try {
    const analysis = await analyzeReceipt(base64String);
    return analysis;
  } catch (error) {
    console.error("Error scanning receipt:", error);
    throw error;
  }
}
