import React, { memo } from "react";
import { render } from "react-dom";
import { useStandaloneField } from "./useForm";

const maxLength = length => text => text.slice(0, length);
const maxLength6 = maxLength(6);
const maxLength16 = maxLength(16);

function Input({ form, field, initial, ...props }) {
  console.log("rendering");
  const standaloneField = useStandaloneField({
    formName: form,
    fieldName: field,
    initialValue: initial
  });
  return <input {...standaloneField} {...props} />;
}

const MemoInput = memo(Input);

function createInputs(number) {
  const fields = [];
  for (let i = 0; i < number; i++) {
    fields.push({
      key: i,
      form: "alone",
      field: "field" + i,
      initial: "field" + i
    });
  }
  return fields;
}

const testFields = createInputs(10);

function App(props) {
  return (
    <div>
      {testFields.map(field => (
        <MemoInput {...field} />
      ))}
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
