import { forwardRef } from "react";
import { FiSearch } from "react-icons/fi";

type IProps = React.InputHTMLAttributes<HTMLInputElement>;
export const AppInput = forwardRef<HTMLInputElement, IProps>((props, ref) => {
  return (
    <div className="w-auto relative">
      <input
        ref={ref}
        type="text"
        className="w-full h-[2.5rem] bg-gray-100 text-[0.875rem] text-gray-400 placeholder:text-gray-400 rounded-[1.5rem] pl-[1rem] pr-[3.5rem] outline-none"
        {...props}
      />
      {props.type === "search" && (
        <FiSearch
          className="absolute top-[50%] right-[1rem] text-gray-400 -translate-y-1/2"
          width={24}
        />
      )}
    </div>
  );
});
