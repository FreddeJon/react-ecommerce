import React, { useState } from "react";
import "./form-input.styles.scss";

const FormInput = ({ label, inputOptions }) => {
  const [readonly, setReadonly] = useState(true);

  return (
    <div className="group">
      <input
        className="form-input"
        autoComplete="none"
        readOnly={readonly}
        onFocus={() => setReadonly(false)}
        {...inputOptions}
      />
      {label && <label className={`form-input-label${inputOptions.value.length > 0 ? " shrink" : ""}`}>{label}</label>}
    </div>
  );
};

export default FormInput;
