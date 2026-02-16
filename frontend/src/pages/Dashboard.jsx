import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    load();
  }, [page, search]);

  async function load() {
    const res = await api.get("/incidents", {
      params: { page, search }
    });

    setData(res.data.data);
  }

  return (
    <div className="p-6">
      <h1>Incident Dashboard</h1>

      <input
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      <Link to="/create">Create Incident</Link>

      <br />
      <br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Title</th>
            <th>Severity</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((i) => (
            <tr key={i.id}>
              <td>{i.title}</td>
              <td>{i.severity}</td>
              <td>{i.status}</td>
              <td>
                <Link to={`/details/${i.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>

      <span> Page {page} </span>

      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}
