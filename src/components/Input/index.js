import "./Input.css";

export default function Input({
  label = "Insira o campo",
  type = "text",
  value,
  name,
  placeholder = "Insira o campo",
  required = false,
  onChange
}) {
  return (
    <div className="easy-container-custom-input">
      <label>{label} {required ? <span className="easy-required-custom-input">*</span> : ""}</label>
      <input name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} required={required}></input>
    </div>
  );
}
