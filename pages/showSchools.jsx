"use client";
import { useEffect, useState } from "react";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/getSchools")
      .then((r) => r.json())
      .then((data) => {
        setSchools(data || []);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1>Schools Directory</h1>
        <a href="/addSchool" className="small">Add School →</a>
      </div>

      {loading ? <div className="small">Loading…</div> : (
        <div className="grid">
          {schools.length === 0 && <div className="small">No schools found.</div>}
          {schools.map((s) => (
            <div className="card" key={s.id}>
              <img src={s.image || '/placeholder.png'} alt={s.name || 'School Image'} />
              <h3 style={{marginTop:8}}>{s.name}</h3>
              <div className="small">{s.address}</div>
              <div style={{marginTop:6,fontWeight:600}}>{s.city}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}