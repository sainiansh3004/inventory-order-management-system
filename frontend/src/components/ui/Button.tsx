interface ButtonProps {
  text: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

const Button = ({
  text,
  type = "button",
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
        w-full
        p-4
        rounded-xl
        bg-gradient-to-r
        from-blue-600
        to-indigo-600
        hover:scale-105
        text-white
        font-semibold
        transition-all
        duration-300
      "
    >
      {text}
    </button>
  );
};

export default Button;