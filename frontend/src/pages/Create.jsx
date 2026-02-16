import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  function handle(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit() {
    await api.post("/incidents", {
      ...form,
      status: "OPEN"
    });

    navigate("/");
  }

  return (
    <div className="p-6">
      <h2>Create Incident</h2>

      <input name="title" placeholder="Title" onChange={handle} />
      <br />

      <input name="service" placeholder="Service" onChange={handle} />
      <br />

      <select name="severity" onChange={handle}>
        <option value="SEV1">SEV1</option>
        <option value="SEV2">SEV2</option>
        <option value="SEV3">SEV3</option>
        <option value="SEV4">SEV4</option>
      </select>

      <br />
      <br />

      <button onClick={submit}>Save</button>
    </div>
  );
}
