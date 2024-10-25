import { DropdownPropsTypes } from "../../Types/CommonTypes";

export default function Dropdown({
  optionName,
  name,
  ...props
}: DropdownPropsTypes) {
  return (
    <div className=" flex flex-col gap-1 font-normal">
      <label htmlFor={name}>
        {name ? "Transaction Type" : "Transaction Category"}
      </label>
      <select id={name} name={name} {...props} required>
        <option value="">
          {name === "category" ? "Select Transaction Type" : "Select"}
        </option>
        {optionName.map((each) => (
          <option key={each.name} value={each.name}>
            {each.name}
          </option>
        ))}
      </select>
    </div>
  );
}
