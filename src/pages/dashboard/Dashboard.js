import { useEffect, useState } from "react";
import { useCollection } from "../../hooks/useCollection";
//styles
import "./Dashboard.css";

export default function Dashboard() {
  const { documents, error } = useCollection("projects");

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>
      {documents && documents.map((doc) => <p key={doc.id}>{doc.name}</p>)}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
