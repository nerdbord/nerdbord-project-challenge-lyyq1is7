"use server";
import { prisma } from "@/lib/prisma";
import { checkUserInDatabase } from "./user";
import { Expense } from "@/components/Expenses";
import * as XLSX from "xlsx";
import { CATEGORIES_LIB } from "@/lib/categories";

const CATEGORIES = CATEGORIES_LIB;

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
              content: `You are a personal financial assistant. Your task is to analyze the receipt photo from the provided link and read the data needed for analysis - what amount was spent, what category of expenses, what it was spent on, in which store, date and time. The description that will be the result of your task should be short and specific.
              Answer ONLY by filling clean JSON. Make sure to check out the JSON structure correctly and in the following format:
              {
                "expense": {
                  "date": "date of purchase",
                  "store": "store name",
                  "total": "sum of money spent as number",
                  "currency": "CURRENCY",
                  "items": "all bought products, separated by commas",
                  "category": "category of expense"
                }
              }
              Match the categories from the table: ${CATEGORIES.join(", ")}.
              If any of the data is not included in the receipt, enter NO DATA. If the photo is too bright or too dark or has unreadable text or is not a receipt return a JSON with an explanation:
              {
                "error": {
                  "message": "explanation of the problem"
                }
              }`,
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

    if (!response.ok) {
      console.error("API request failed with status:", response.status);
      return {
        error: {
          message: `An unexpected error occurred during receipt analysis`,
        },
      };
    }

    const responseData = await response.text();
    console.log("Raw response data:", responseData); // Log raw response data

    try {
      // Extract and clean JSON content
      const jsonStartIndex = responseData.indexOf("{");
      const jsonEndIndex = responseData.lastIndexOf("}") + 1;

      if (jsonStartIndex === -1 || jsonEndIndex === -1) {
        return {
          error: {
            message: "Could not find JSON content in the response",
          },
        };
      }

      const rawJson = responseData.substring(jsonStartIndex, jsonEndIndex);
      const cleanedResponseData = rawJson.trim();
      const parsedData = JSON.parse(cleanedResponseData);
      console.log("Parsed JSON content:", parsedData);

      if (parsedData && parsedData.choices && parsedData.choices.length > 0) {
        const content = parsedData.choices[0].message.content;

        // Extract JSON content from the content string
        const contentJsonStart = content.indexOf("{");
        const contentJsonEnd = content.lastIndexOf("}") + 1;
        if (contentJsonStart === -1 || contentJsonEnd === -1) {
          throw new Error("Could not find JSON content in the message");
        }

        const jsonContent = content.substring(contentJsonStart, contentJsonEnd);
        const sanitizedContent = jsonContent
          .replace(/`|‘|’|“|”/g, '"') // Normalize quotes
          .replace(/\\n/g, "")
          .replace(/\\t/g, "")
          .replace(/\\r/g, "")
          .replace(/\\"/g, '"')
          .replace(/\\\\/g, "\\");

        const parsedContent = JSON.parse(sanitizedContent);
        console.log("Parsed JSON content:", parsedContent);

        if (parsedContent && parsedContent.expense) {
          return parsedContent;
        } else {
          throw new Error(
            "Parsed content does not contain the expected structure."
          );
        }
      } else {
        console.error(
          "No valid choices found in the response data:",
          parsedData
        );
        return {
          error: {
            message: "An unexpected error occurred during receipt analysis",
          },
        };
      }
    } catch (parseError) {
      console.error("Error parsing JSON content:", responseData);
      console.error("Detailed error:", parseError);
      return {
        error: {
          message: "An unexpected error occurred during receipt analysis",
        },
      };
    }
  } catch (error) {
    console.error("Error analyzing receipt:", error);
    return {
      error: {
        message: "An unexpected error occurred during receipt analysis",
      },
    };
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
    console.log("Failed to save analyzed receipt:");
    console.log(error);
    throw error;
  }
}

export async function fetchExpenses() {
  try {
    const prismaUser = await checkUserInDatabase();

    console.log('prismaUser', prismaUser)

    if (!prismaUser || !prismaUser.id) {
      return { message: "Authenticated user not found or has no ID." };
    }

    const expenses = await prisma.receipts.findMany({
      where: { userId: prismaUser.id },
    });

    // if (!expenses) {
    //   return { message: " No expenses" };
    // }

    return expenses;
  } catch (error) {
    return { message: JSON.stringify(error) };
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
