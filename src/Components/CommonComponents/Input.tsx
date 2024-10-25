export default function Input({ id, labelName, ...props }) {
    return (
      <div className=" flex flex-col gap-1">
        <label htmlFor={id} className=" text-gray-400 dark:text-white">
          {labelName}
        </label>
        <input id={id} {...props} required />
      </div>
    );
  }
  