import Carousel from "@/components/Carousel";
import ExpenseItem from "@/components/ExpenseItem";
import Header from "@/components/Header";
import Separator from "@/components/Separator";

export default function Page() {
  return (
    <div className="p-10">
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
