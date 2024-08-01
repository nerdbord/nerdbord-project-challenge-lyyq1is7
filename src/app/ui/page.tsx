import Carousel from "@/components/ui/Carousel";
import CurrentMonthBox from "@/components/ui/CurrentMonthBox";
import ExpenseItem from "@/components/ui/ExpenseItem";
import Header from "@/components/ui/Header";
import Separator from "@/components/ui/Separator";
import WelcomeBox from "@/components/ui/WelcomeBox";

export default function Page() {
  return (
    <div className="ui-container">
      <WelcomeBox />
      <CurrentMonthBox />
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
