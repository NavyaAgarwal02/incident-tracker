import React, { useEffect, useState } from "react";
import api from "../api";
import { useParams } from "react-router-dom";

export default function Details() {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    api.get(`/incidents/${id}`).then((res) => {
      setData(res.data);
    });
  }, [id]);

  async function update(status) {
    await api.patch(`/incidents/${id}`, { status });
    alert("Status Updated");
  }

  return (
    <div className="p-6">
      <h2>{data.title}</h2>

      <p>
        <b>Service:</b> {data.service}
      </p>

      <p>
        <b>Summary:</b> {data.summary}
      </p>

      <p>
        <b>Status:</b> {data.status}
      </p>

      <select
        defaultValue={data.status}
        onChange={(e) => update(e.target.value)}
      >
        <option value="OPEN">OPEN</option>
        <option value="MITIGATED">MITIGATED</option>
        <option value="RESOLVED">RESOLVED</option>
      </select>
    </div>
  );
}
