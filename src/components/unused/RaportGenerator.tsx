/* import React from "react";
import { Expense } from "../Expenses";
import { generateReport } from "@/actions/receipt";

interface ReportGeneratorProps {
  data: Expense[];
  startDate: string;
  endDate: string;
}

export const ReportGenerator: React.FC<ReportGeneratorProps> = ({
  data,
  startDate,
  endDate,
}) => {
  const handleGenerateReport = async () => {
    try {
      await generateReport(data, startDate, endDate);
    } catch (error) {
      console.error("Failed to generate report:", error);
    }
  };

  return (
    <button
      onClick={handleGenerateReport}
      className="btn btn-outline btn-primary"
    >
      Generate Report
    </button>
  );
}; */
