import MobileDetailsList from "./MobileDetailsList";
import { TransactionData } from "../Types/CommonTypes";

export default function MobileDetailsContainer({ data }:{data:{transactions:TransactionData[]}})
 {
  return (
    <ul className="lg:hidden flex flex-col items-center gap-4">
      <>
        {data.transactions.map((eachItems) => (
          <MobileDetailsList eachItems={eachItems} />
        ))}
      </>
    </ul>
  );
}