import { DropdownPropsTypes } from "../../Types/CommonTypes";

export default function Dropdown({
  itemsName,
  types,
  ...props
}: DropdownPropsTypes) {
  return (
    <div className=" flex flex-col gap-1 font-normal">
      <label htmlFor={types}>
        {types ? "Transaction Type" : "Transaction Category"}
      </label>
      <select id={types} name={types} {...props} required>
        <option value="">
          {types === "category" ? "Select Transaction Type" : "Select"}
        </option>
        {itemsName.map((each) => (
          <option key={each.name} value={each.name}>
            {each.name}
          </option>
        ))}
      </select>
    </div>
  );
}
