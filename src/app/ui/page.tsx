import Carousel from "@/components/ui/Carousel";
import CurrentMonthBox from "@/components/ui/CurrentMonthBox";
import ExpenseItem from "@/components/ui/ExpenseItem";
import WelcomeAllExpensesItem from "@/components/ui/WelcomeAllExpensesItem";
import WelcomeBox from "@/components/ui/WelcomeBox";
import "./../globals.css";
import { fetchExpenses } from "@/actions/receipt";

export default async function Page() {
  const expensesData = await fetchExpenses();
  return (
    <div className="ui-container">
      <WelcomeBox />
      <CurrentMonthBox />
      {/* <WelcomeAllExpensesItem date={date} total={total} />
    <WelcomeAllExpensesItem date={date} total={total} /> />
    <WelcomeAllExpensesItem date={date} total={total} /> */}
      {/* <ExpensesList expensesData={expensesData} /> */}
      
      <h1>Your last expenses</h1>
      <div>
        <span>July</span>
        <span>-1800,75 PLN</span>
        <span>toggle ikona</span>
      </div>
      <ExpenseItem />
      <ExpenseItem />
      <ExpenseItem />
      <div>
        <span>July</span>
        <span>-1800,75 PLN</span>
        <span>toggle ikona</span>
      </div>
      <Carousel />
      
    </div>
  );
}
