import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { formLoadsingleAction } from '../redux/actions/FormAction';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
export const Formulaire = ()=> {
  const { register, handleSubmit } = useForm();
  const [customFormFields, setCustomFormFields] = useState([]);
  const { id } = useParams();
const dispatch=useDispatch()
  useEffect(() => {
    dispatch(formLoadsingleAction(id))
  }, []);
   const {form} = useSelector( (state) => state.singleform);
  const onSubmit = async (data) => {
    try {
      const formValues = JSON.stringify(data);
      await axios.post(`/api/users/form/${id}`, { Values: formValues });
      toast.success("CV créé avec succès")
    } catch (err) {
      console.error(err);
   toast.error("tu as déja remplit ce CV")
    }
  };
 
  useEffect(() => {
    if (form) {
      const formattedData = form.fields?.map((f) => {
        if (f.type === "select") {
          return {
            type: f.type,
            label: f.label,
            options: f.options?.map((o) => o.label),
          };
        } else if (f.type === "checkbox") {
          return {
            type: f.type,
            label: f.label,
            options: f.options?.map((o) => ({ name: `${f.label}-${o.label}`, label: o.label })),
          };
        } else {
          return {
            type: f.type,
            label: f.label,
          };
        }
      });
      setCustomFormFields(formattedData);
    } else {
      setCustomFormFields([]);
    }
  }, [form]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {customFormFields.map((field, index) => {
        const key = `field-${index}`;
        const name = `field-${index}`;
        const label = field.label || `Field ${index + 1}`;
        const options = field.options || [];

        switch (field.type) {
          case 'text':
            return (
              <div key={key}>
                <label>{label}</label>
                <input type="text" {...register(name)} />
              </div>
            );
          case 'date':
            return (
              <div key={key}>
                <label>{label}</label>
                <input type="date" {...register(name)} />
              </div>
            );
          case 'file':
            return (
              <div key={key}>
                <label>{label}</label>
                <input type="file" {...register(name)} />
              </div>
            );
          case 'checkbox':
            return (
              <div key={key}>
                <label>{label}</label>
                {options.map((option, optionIndex) => {
                  const optionKey = `option-${optionIndex}`;
                  const optionName = `${name}-option-${optionIndex}`;
                  const optionLabel = option.label || `Option ${optionIndex + 1}`;
                  return (
                    <div key={optionKey}>
                      <label>
                        <input type="checkbox" {...register(optionName)} />
                        {optionLabel}
                      </label>
                    </div>
                  );
                })}
              </div>
            );
          case 'radio':
            return (
              <div key={key}>
                <label>{label}</label>
                {options.map((option, optionIndex) => {
                  const optionKey = `option-${optionIndex}`;
                  const optionName = `${name}-option`;
                  const optionValue = option.label || `Option ${optionIndex + 1}`;
                  const optionLabel = option.label || `Option ${optionIndex + 1}`;
                  return (
                    <div key={optionKey}>
                      <label>
                        <input type="radio" {...register(optionName)} value={optionValue} />
                        {optionLabel}
                      </label>
                    </div>
                  );
                })}
              </div>
            );
          case 'select':
            return (
              <div key={key}>
                <label>{label}</label>
                <select {...register(name)}>
                  {options.map((option, optionIndex) => {
                    const optionKey = `option-${optionIndex}`;
                    const optionLabel = option.label || `Option ${optionIndex + 1}`;
                    return (
                      <option key={optionKey} value={optionLabel}>
                        {optionLabel}
                      </option>
                    );
                })}
                </select>
              </div>
            );
          default:
            return null;
        }
      })}
      <button type="submit">Submit</button>
    </form>
    );
    }
