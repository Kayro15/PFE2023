import { useEffect, useState } from 'react';

const CustomForm = () => {
  const [customFormFields, setCustomFormFields] = useState([]);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    async function fetchCustomFormFields() {
      const response = await fetch('/api/users/form/myforms');
      const data = await response.json();
      console.log(data);
      const fields = data.flatMap((item) =>
      item.CustomForm.fields.map((field) => {
        const { label, type } = field;
        let options = [];
        if (type === 'select' || type === 'checkbox') {
          options = field.options?.map((option) => ({
            label: option.label,
            value: option.value,
          }));
        }
        return { label, type, options };
      }))
    

      const values = data.reduce((obj, item) => {
        if (item.Values) {
          Object.entries(item.Values).forEach(([key, value], index) => {
            const label = fields[index]?.label || `Field ${index + 1}`;
            obj[label] = value;
          });
        }
        return obj;
      }, {});

      setCustomFormFields(fields);
      setFormValues(values);
    }

    fetchCustomFormFields();
  }, []);

  const getCheckboxValue = (label, optionLabel) => {
    const checkboxValue = formValues[`${label}-option-${optionLabel}`];
    return checkboxValue || false;
  };

  return (
    <form>
      {customFormFields.map((field, index) => {
        const label = field.label || `Field ${index + 1}`;
        const value = formValues[label] || '';

        switch (field.type) {
          case 'text':
            return (
              <div key={`field-${index}`}>
                <label>{label}</label>
                <input type="text" value={value} readOnly />
              </div>
            );
          case 'date':
            return (
              <div key={`field-${index}`}>
                <label>{label}</label>
                <input type="date" value={value} readOnly />
              </div>
            );
          case 'file':
            return (
              <div key={`field-${index}`}>
                <label>{label}</label>
                <input type="file" readOnly />
              </div>
            );
          case 'select':
            return (
              <div key={`field-${index}`}>
                <label>{label}</label>
                <select value={value} readOnly>
                  {field.options?.map((option, optionIndex) => (
                    <option key={`field-${index}-option-${optionIndex}`} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            );
          case 'checkbox':
            return (
              <div key={`field-${index}`}>
                <label>{label}</label>
                {field.options?.map((option, optionIndex) => (
                  <div key={`field-${index}-option-${optionIndex}`}>
                    <label>{option.label}</label>
                    <input
                      type="checkbox"
                      checked={getCheckboxValue(label, optionIndex)}
                      readOnly
                    />
                  </div>
                ))}
              </div>
            );
          default:
            return null;
        }
      })}
    </form>
  );
};

export default CustomForm;
