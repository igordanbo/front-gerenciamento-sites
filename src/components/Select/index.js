import "./Select.css";

export default function Select({
  label = "Selecione uma opção",
  defaultOptionText = "Todos",
  defaultOptionValue = "",
  options,
  onChange,
  name,
  value,
  children,
}) {
  const safeOptions = Array.isArray(options) ? options : [];

  return (
    <div className="container-custom-select">
      <label>{label}</label>
      <select name={name} onChange={onChange} value={value}>
        <option value={defaultOptionValue}>{defaultOptionText}</option>

        {safeOptions.map((option) => (
          <option key={option?.value} value={option?.value}>
            {option?.label}
          </option>
        ))}
        {children}
      </select>
    </div>
  );
}
