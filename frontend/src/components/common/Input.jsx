function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  disabled = false,
}) {
  return (
    <div className="form-group">

      {label && (
        <label htmlFor={name}>
          {label}
        </label>
      )}

      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />

    </div>
  );
}

export default Input;