import { useState } from "react";

const UseStateForm = () => {
  const [form, setForm] = useState({ name: "", age: "" });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="name"
      />
      <input
        name="age"
        value={form.age}
        onChange={handleChange}
        placeholder="age"
      />
    </div>
  );
};

export default UseStateForm;
