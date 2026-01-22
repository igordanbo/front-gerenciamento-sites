import "./ButtonPrimary.css";

export default function ButtonPrimary({
  children,
  addClass,
  title,
  onClick,
  type,
  disabled,
}) {
  return (
    <button
      className={`easy-button-primary easy-button-primary-${addClass} disabled-${disabled}`}
      title={title}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
