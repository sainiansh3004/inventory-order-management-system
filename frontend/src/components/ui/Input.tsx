interface InputProps {
  type?: string;
  placeholder: string;
}

const Input = ({
  type = "text",
  placeholder,
}: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="
        w-full
        p-4
        rounded-xl
        bg-slate-950
        border
        border-slate-700
        text-white
        outline-none
        focus:border-blue-500
        transition
      "
    />
  );
};

export default Input;