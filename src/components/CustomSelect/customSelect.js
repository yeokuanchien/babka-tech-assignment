import "./customSelect.css";

function CustomSelect(props) {
  const { labelText, options, handleOnChange } = props;

  return (
    <div style={{ marginRight: "20px" }}>
      <label for="select-component" className="dropdown-label">
        {labelText}
      </label>
      <select
        id="select-component"
        className="select-element"
        onChange={(event) => {
          handleOnChange(event.target.value);
        }}
      >
        <option disabled selected value>
          {"Please Select"}
        </option>
        {options.map((v) => (
          <option value={v}>{v}</option>
        ))}
      </select>
    </div>
  );
}

export default CustomSelect;
