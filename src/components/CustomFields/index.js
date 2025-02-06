import React, { useState } from "react";

const CustomFieldForm = (currentfields) => {
  const [fields, setFields] = useState(currentfields.currentfields);

  const handleChange = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    setFields(updatedFields);
  };

  const handleCheckboxChange = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index].isGlobal = value;
    setFields(updatedFields);
  };

  const handleAddField = () => {
    setFields([...fields, { name: "", value: "", isGlobal: false }]);
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  return (
    <div>
      {fields.map((field, index) => (
        <div key={index}>
          <input
            type="text"
            value={field.name}
            placeholder="Field name"
            onChange={(e) => handleChange(index, "name", e.target.value)}
          />
          <input
            type="text"
            value={field.value}
            placeholder="Initial value"
            onChange={(e) => handleChange(index, "value", e.target.value)}
          />
          <label>
            Global:
            <input
              type="checkbox"
              checked={field.isGlobal}
              onChange={(e) => handleCheckboxChange(index, e.target.checked)}
            />
          </label>
          <button onClick={() => handleRemoveField(index)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddField}>Add Field</button>
    </div>
  );
};

export default CustomFieldForm;
