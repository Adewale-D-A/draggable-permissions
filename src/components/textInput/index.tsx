import { ChangeEvent } from "react";

interface Props {
  value: string;
  setValue: Function;
  inputType: string;
  label: string;
  isRequired: boolean;
  id: string;
  placeholder: string;
}

function TextInput({
  value,
  setValue,
  inputType,
  label,
  isRequired,
  id,
  placeholder,
}: Props) {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className="w-full">
      <label htmlFor={id} className=" font-medium">
        {label}
      </label>
      <input
        id={id}
        placeholder={placeholder}
        required={isRequired}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInput(e)}
        type={inputType}
        className="w-full p-4 rounded-[4px] mt-3 border border-gray-300 bg-gray-200/15 focus:ring-[#17594F] focus:border-[#17594F]"
      />
    </div>
  );
}

export default TextInput;
