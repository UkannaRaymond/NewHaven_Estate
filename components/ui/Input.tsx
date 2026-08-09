import clsx from "clsx";
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface BaseProps {
  label: string;
  name: string;
  error?: string;
  as?: "input" | "textarea";
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

type InputProps = BaseProps & InputHTMLAttributes<HTMLInputElement>;
type TextareaProps = BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Input({
  label,
  name,
  error,
  id,
  value,
  as = "input",
  className,
  onChange,
  ...props
}: InputProps | TextareaProps) {
  const hasValue = value !== "";
  const inputId = id ?? name;
  const sharedClasses = clsx(
    `peer
   w-full
   border
   text-gray-600
   bg-white
   focus:border-2
   px-4
   text-sm
   outline-none
   transition
   disabled:opacity-70`,
    error
      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-gray-300 hover:border-gray-400 focus:border-black focus:ring-2 focus:ring-black/5",
    as === "textarea"
      ? "min-h-[120px] pt-6 pb-3 resize-none rounded-xl"
      : "h-14 pt-6 rounded-xl",
    className,
  );
  return (
    <div className="w-full">
      <div className="relative">
        {as === "textarea" ? (
          <textarea
            name={name}
            id={inputId}
            value={value}
            placeholder=" "
            className={sharedClasses}
            onChange={onChange}
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={inputId}
            name={name}
            value={value}
            placeholder=" "
            className={sharedClasses}
            onChange={onChange}
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        <label
          htmlFor={inputId}
          className={clsx(
            `
            absolute
            left-4
            top-4
            text-gray-500
            text-sm
            transition-all
            duration-200
            pointer-events-none
            origin-left
            `,
            hasValue
              ? "scale-75 -translate-y-3 text-gray-700"
              : "peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-gray-700",
          )}
        >
          {label}
        </label>
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
