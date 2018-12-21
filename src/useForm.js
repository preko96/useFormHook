import { useEffect, useState } from "react";

const formStore = {};

export default function useForm(props) {
  const safeProps = props || {};
  const { formName, initialValues } = safeProps;
  useEffect(() => {
    formStore[formName] = initialValues;
    return () => delete formStore[formName];
  }, []);

  function useField(fieldProps) {
    const [, forceUpdate] = useState();
    const [onChange] = useState(() => e => {
      const value = e.target.value;
      const normalizedValue = normalize ? normalize(value) : value;
      formStore[formName][fieldName] = normalizedValue;
      forceUpdate();
    });

    const { fieldName, normalize } = fieldProps;
    const value =
      (formStore[formName] && formStore[formName][fieldName]) ||
      (props.initialValues && props.initialValues[fieldName]) ||
      "";
    const sureNormalizedValue = normalize ? normalize(value) : value;
    return { value: sureNormalizedValue, onChange };
  }

  function submit() {
    const actualForm = formStore[formName];
    return actualForm;
  }
  return { useField, submit };
}

export function useStandaloneField(fieldProps) {
  const { formName, fieldName, initialValue, normalize } = fieldProps;
  if (!formStore[formName]) formStore[formName] = {};

  const [, forceUpdate] = useState();
  const [onChange] = useState(() => e => {
    const value = e.target.value;
    const normalizedValue = normalize ? normalize(value) : value;
    formStore[formName][fieldName] = normalizedValue;
    forceUpdate();
  });

  const value =
    (formStore[formName] && formStore[formName][fieldName]) ||
    initialValue ||
    "";
  const sureNormalizedValue = normalize ? normalize(value) : value;
  return { value: sureNormalizedValue, onChange };
}
