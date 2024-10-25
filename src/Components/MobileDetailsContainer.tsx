import MobileDetailsList from "./MobileDetailsList";
import { ActionTypeData } from "../Types/ContextTypes";

export default function MobileDetailsContainer({ data }:{data:{transactions:ActionTypeData[]}})
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