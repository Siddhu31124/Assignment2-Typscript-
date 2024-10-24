import { observer } from "mobx-react-lite";
import dayjs from "dayjs";
import { CiCircleChevUp, CiCircleChevDown } from "react-icons/ci";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { DATA_FORMAT, TYPE_OF_TRANSACTION_CREDIT } from "../../Constants";
import TableHead from "./TableHead";
import { TransactionTableType } from "../../Types/TableTypes";
import mainStore from "../../Store/MainStore";

// No magic strings
const TransactionTable = observer(({ data, head, tableClass }: TransactionTableType) => {
  const tableHeadPresent = () => {
    if (head) {
      return <TableHead />;
    }
  };

  return (
    <table className={tableClass}>
      {tableHeadPresent()}
      <tbody>
        {data.transactions.map((eachItem) => (
          <tr
            key={eachItem.id}
            className="flex pb-4 items-center p-3 border-b-2 border-black dark:border-slate-500"
          >
            <td className="flex gap-4 items-center">
              {eachItem.type === TYPE_OF_TRANSACTION_CREDIT ? (
                <CiCircleChevUp className="text-2xl text-green-600" />
              ) : (
                <CiCircleChevDown className="text-2xl text-red-600" />
              )}
              {eachItem.transaction_name}
            </td>
            <td>{eachItem.category}</td>
            <td>{dayjs(eachItem.date).format(DATA_FORMAT)}</td>
            <td
              className={
                eachItem.type === TYPE_OF_TRANSACTION_CREDIT
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {eachItem.type === TYPE_OF_TRANSACTION_CREDIT ? "+" : "-"}${eachItem.amount}
            </td>
            <td>
              <button
                className="mx-5 text-green-500"
                onClick={() => mainStore.handelOpenModal("isEdit", eachItem)}
              >
                <FaPencilAlt />
              </button>
              <button
                className="text-red-500"
                onClick={() => mainStore.handelOpenModal("isDelete", eachItem.id)}
              >
                <MdDelete />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

export default TransactionTable;
