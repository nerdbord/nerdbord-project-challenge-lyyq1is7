import Carousel from "@/components/ui/Carousel";
import CurrentMonthBox from "@/components/ui/CurrentMonthBox";
import ExpenseItem from "@/components/ui/ExpenseItem";
import Header from "@/components/ui/Header";
import Separator from "@/components/ui/Separator";
import WelcomeAllExpensesItem from "@/components/ui/WelcomeAllExpensesItem";
import WelcomeBox from "@/components/ui/WelcomeBox";
import ExpensesList from "@/components/ui/ExpensesList";
import "./../globals.css";
import { fetchExpenses } from "@/actions/receipt";

export default async function Page() {
  const expensesData = await fetchExpenses();
  return (
    <div className="ui-container">
      <WelcomeBox />
      <CurrentMonthBox />
      {/* <WelcomeAllExpensesItem month={month} sumOfMonth={sumOfMonth}/>
      <WelcomeAllExpensesItem month={month} sumOfMonth={sumOfMonth}/>
      <WelcomeAllExpensesItem month={month} sumOfMonth={sumOfMonth}/> */}
      <ExpensesList expensesData={expensesData} />
      <Header />
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
      <Separator />
      <Carousel />
    </div>
  );
}
