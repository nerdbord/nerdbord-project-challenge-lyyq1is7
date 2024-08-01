import Carousel from "@/components/ui/Carousel";
import ExpenseItem from "@/components/ui/ExpenseItem";
import Header from "@/components/ui/Header";
import Separator from "@/components/ui/Separator";

export default function Page() {
  return (
    <div className="p-10">
      <Header />
      <button className="btn btn-primary">One</button>
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
